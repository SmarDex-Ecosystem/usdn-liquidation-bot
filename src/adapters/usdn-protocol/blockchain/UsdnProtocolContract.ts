import {
    type Address,
    type Hex,
    type PublicActions,
    type ReadContractParameters,
    type WalletClient,
    isAddress,
    zeroAddress,
} from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export type FunctionCall = Omit<ReadContractParameters<typeof abi>, 'abi' | 'address'>;

export default class UsdnProtocolContract {
    /** Client to use to interact with the smart contract */
    private readonly blockchainClient: WalletClient & PublicActions;
    /** The address of the USDN Protocol's smart contract */
    private readonly contractAddress: Address;

    constructor(contractAddress: Address, blockchainClient: WalletClient & PublicActions) {
        if (!isAddress(contractAddress)) {
            throw new Error('Invalid Ethereum address for the USDN protocol');
        }

        this.contractAddress = contractAddress;
        this.blockchainClient = blockchainClient;
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
            // query for the 0 address so we get every actionable pending actions
            args: [zeroAddress],
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

    /** Calls the getHighestPopulatedTick function in the contract
     * @returns Result of the function call
     */
    async getHighestPopulatedTick() {
        return this.handleContractInteraction({
            functionName: 'getHighestPopulatedTick',
        });
    }

    /**
     * Calls multiple functions in the contract and returns the result
     * @param calls List of function names and their arguments to call
     * @returns Result of the multicall
     */
    async multicall(calls: FunctionCall[]) {
        return this.handleMulticall(calls);
    }

    /** Handles interaction with the contract and returns the result */
    private async handleContractInteraction(call: FunctionCall) {
        return this.blockchainClient.readContract({
            ...call,
            address: this.contractAddress,
            abi: abi,
        });
    }

    /** Handles multicall interactions with the contract */
    private async handleMulticall(calls: FunctionCall[]) {
        const contracts = calls.map((call) => ({
            ...call,
            address: this.contractAddress,
            abi: abi,
        }));
        return this.blockchainClient.multicall({ contracts });
    }
}
