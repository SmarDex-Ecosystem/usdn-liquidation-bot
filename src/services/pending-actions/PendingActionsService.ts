import type { Hex, PublicActions } from 'viem';
import type UsdnProtocolContract from '../../adapters/usdn-protocol/blockchain/UsdnProtocolContract.ts';
import type { AHighLatencyOracle, ALowLatencyOracle } from '../../adapters/oracles/AOracleAdapter.ts';
import { sleep } from '../../utils/index.ts';
import type AOracleAdapter from '../../adapters/oracles/AOracleAdapter.ts';

export default class PendingActionsService {
    private isRunning = false;

    constructor(
        /** Adapter to communicate with the USDN Protocol's smart contract */
        private readonly usdnProtocol: UsdnProtocolContract,
        /** Client to communicate with the blockchain */
        private readonly blockchainClient: PublicActions,
        /** Oracle to use for actions within the low latency time frame */
        private readonly lowLatencyOracleAdapter: ALowLatencyOracle,
        /** Oracle to use for actions outside the high latency time frame */
        private readonly highLatencyOracleAdapter: AHighLatencyOracle,
    ) {}

    /** Watch for actionable pending actions at every block and validate them when there are any */
    async watchActionablePendingActions() {
        if (this.isRunning) return;

        // handle graceful shutdown
        process.on('SIGINT', () => {
            this.isRunning = false;
        });
        process.on('SIGTERM', () => {
            this.isRunning = false;
        });

        // TODO get those values from a contract call instead (RA2BL-80)
        const validationDelay = 24;
        const lowLatencyDelay = 20 * 60;
        this.isRunning = true;
        while (this.isRunning) {
            await sleep(5000);
            const block = await this.blockchainClient.getBlock();
            const { pendingActions, rawIndices } = await this.usdnProtocol.getActionablePendingActions();

            // return early if there are no pending actions
            if (pendingActions.length === 0) {
                console.debug(
                    `[${+Date.now()}] No pending actions for block ${block.number} at timestamp ${block.timestamp}`,
                );
                continue;
            }

            const priceSignaturePromises: Promise<Hex>[] = [];
            // add the block time (12s) to account for the time spent in the mempool
            const validationTimestamp = block.timestamp + 12n;
            let oracleFee = 0n;
            for (let i = 0; i < pendingActions.length; i++) {
                const pendingAction = pendingActions[i];
                // check which oracle adapter to use based on the age of the action
                let timestamp = pendingAction.timestamp + validationDelay;
                let oracleToUse: AOracleAdapter = this.lowLatencyOracleAdapter;
                if (validationTimestamp > pendingAction.timestamp + lowLatencyDelay) {
                    oracleToUse = this.highLatencyOracleAdapter;
                    timestamp = pendingAction.timestamp + lowLatencyDelay;
                }

                oracleFee += oracleToUse.VALIDATION_COST;
                priceSignaturePromises.push(
                    oracleToUse.getPriceAtTimestamp(timestamp).then(({ signature }) => signature),
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
                continue;
            }

            const { hash, validatedActionsAmount } = await this.usdnProtocol.validateActionablePendingActions(
                priceSignatures,
                rawIndicesToUse,
                oracleFee,
            );

            if (validatedActionsAmount > 0) {
                console.log(
                    `[${+Date.now()}] ${validatedActionsAmount} actions to validate at block ${block.number}, hash: ${hash}`,
                );
            }
        }

        console.log('PendingActionsService has shutdown');
    }
}
