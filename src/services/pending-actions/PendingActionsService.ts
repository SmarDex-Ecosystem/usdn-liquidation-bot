import type { Hex, PublicActions, WalletActions } from 'viem';
import type UsdnProtocolContract from '../../adapters/usdn-protocol/blockchain/UsdnProtocolContract.ts';
import type IOracleAdapter from '../../adapters/oracles/IOracleAdapter.ts';

export default class PendingActionsService {
    /** Adapter to communicate wit the USDN Protocol's smart contract */
    private usdnProtocol;
    /** Oracle to use for actions within the low latency time frame */
    private lowLatencyOracleAdapter;
    /** Oracle to use for actions outside the low latency time frame */
    private highLatencyOracleAdapter;
    /** Client to communicate with the blockchain */
    private blockchainClient;

    constructor(
        usdnProtocol: UsdnProtocolContract,
        blockchainClient: WalletActions & PublicActions,
        lowLatencyOracleAdapter: IOracleAdapter,
        highLatencyOracleAdapter: IOracleAdapter,
    ) {
        this.usdnProtocol = usdnProtocol;
        this.blockchainClient = blockchainClient;
        this.lowLatencyOracleAdapter = lowLatencyOracleAdapter;
        this.highLatencyOracleAdapter = highLatencyOracleAdapter;
    }

    /** Watch for actionable pending actions at every block and validate them when there are any */
    watchActionablePendingActions() {
        // TODO get those values from a contract call instead (RA2BL-80)
        const validationDelay = 24;
        const lowLatencyDelay = 20 * 60;
        const unwatch = this.blockchainClient.watchBlocks({
            onBlock: async (block) => {
                const { pendingActions, rawIndices } = await this.usdnProtocol.getActionablePendingActions();

                // return early if there are no pending actions
                if (pendingActions.length === 0) return;

                const priceSignaturePromises: Promise<Hex>[] = [];
                // add the block time (12s) to account for the time spent in the mempool
                const validationTimestamp = block.timestamp + 12n;
                for (let i = 0; i < pendingActions.length; i++) {
                    const pendingAction = pendingActions[i];
                    const timestamp = pendingAction.timestamp + validationDelay;
                    // check which oracle adapter to use based on the age of the action
                    const adapterToUse =
                        validationTimestamp <= pendingAction.timestamp + lowLatencyDelay
                            ? this.lowLatencyOracleAdapter
                            : this.highLatencyOracleAdapter;

                    priceSignaturePromises.push(
                        adapterToUse.getPriceAtTimestamp(timestamp).then(({ signature }) => signature),
                    );
                }

                const rawIndicesToUse: bigint[] = [];
                const priceSignatures = (await Promise.allSettled(priceSignaturePromises))
                    .filter((result, index) => {
                        // filter out the actions we can't validate if the fetching of the price data failed
                        if (result.status === 'rejected') {
                            console.warn(
                                `Could not get the price data for validator ${pendingActions[index].validator}: ${result.reason}`,
                            );
                            return false;
                        }

                        // only keep the indices for which we were able to get the price data
                        rawIndicesToUse.push(rawIndices[index]);
                        return true;
                    })
                    .map((fulfilledPromise) => (fulfilledPromise as PromiseFulfilledResult<Hex>).value);

                // early return if all of the data fetching failed
                if (priceSignatures.length === 0) {
                    return;
                }

                await this.usdnProtocol.validateActionablePendingActions(priceSignatures, rawIndicesToUse);
            },
        });

        // handle graceful shutdown
        process.on('SIGINT', unwatch);
        process.on('SIGTERM', unwatch);
    }
}
