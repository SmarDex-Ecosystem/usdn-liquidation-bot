import { type Address, type Hex, type PublicActions, type WalletClient, isAddress, zeroAddress } from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export default class UsdnProtocolContract {
    constructor(
        /** The address of the USDN Protocol's smart contract */
        private readonly contractAddress: Address,
        /** Client to use to interact with the smart contract */
        private readonly blockchainClient: WalletClient & PublicActions,
    ) {
        if (!isAddress(contractAddress)) {
            throw new Error('Invalid Ethereum address for the USDN protocol');
        }
    }

    /**
     * Get the address of the oracle middleware currently in use by the protocol
     * @returns The address of the oracle middleware (the dead address if none set)
     */
    async getOracleMiddlewareAddress() {
        return this.blockchainClient.readContract({
            abi: abi,
            address: this.contractAddress,
            functionName: 'getOracleMiddleware',
        });
    }

    /**
     * Get the pending actions that rewards the caller when validated
     * @returns The list of pending actions that can be validated with the list of corresponding raw indices
     */
    async getActionablePendingActions() {
        const [pendingActions, rawIndices] = await this.blockchainClient.readContract({
            abi: abi,
            address: this.contractAddress,
            blockTag: 'pending',
            functionName: 'getActionablePendingActions',
            args: [
                zeroAddress, // query for the 0 address so we get every actionable pending actions
                0n, // no need to look ahead as we get the pending actions at every block
                1000n, // fetch a high amount just in case (maxUint256 will trigger an out-of-memory error)
            ],
        });

        return { pendingActions, rawIndices };
    }

    /**
     * Simulate the validation of pending actions with the current parameters and launch a TX if the simulation
     * indicates that pending actions would be validated by our action
     * @param priceData The price data for each actions that can be validated
     * @param rawIndices The raw indices corresponding to the price data entries
     * @param oracleFee The fee to send as value to pay for oracle price validations
     * @returns The amount of validated pending actions and the TX hash if that amount is > 0
     */
    async validateActionablePendingActions(
        priceData: readonly Hex[],
        rawIndices: readonly bigint[],
        oracleFee: bigint,
    ) {
        const { request, result: validatedActionsAmount } = await this.blockchainClient.simulateContract({
            abi,
            address: this.contractAddress,
            blockTag: 'pending',
            account: this.blockchainClient.account,
            functionName: 'validateActionablePendingActions',
            value: oracleFee,
            args: [
                {
                    priceData,
                    rawIndices,
                },
                BigInt(rawIndices.length),
            ],
        });

        let hash: Hex | undefined;
        if (validatedActionsAmount > 0n) {
            hash = await this.blockchainClient.writeContract(request);
        }

        return { validatedActionsAmount, hash };
    }

    /**
     * Simulate a liquidation call with the provided price and launch a TX if it would result in liquidations
     * @param priceSignature The encoded price to use for liquidating positions
     * @param oracleFee The fee to send as value to pay for oracle price validations
     * @returns The amount of positions liquidated during the simulation
     */
    async liquidate(priceSignature: Hex, oracleFee: bigint) {
        const { request, result: liquidatedTicks } = await this.blockchainClient.simulateContract({
            abi,
            address: this.contractAddress,
            blockTag: 'pending',
            account: this.blockchainClient.account,
            functionName: 'liquidate',
            value: oracleFee,
            args: [priceSignature],
        });

        let hash: Hex | undefined;
        if (liquidatedTicks.length > 0) {
            hash = await this.blockchainClient.writeContract(request);
        }

        return {
            liquidatedTicksAmount: liquidatedTicks.length,
            hash,
        };
    }
}
