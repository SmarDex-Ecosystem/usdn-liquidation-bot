import {
    type Address,
    type Hex,
    type PublicClient,
    type ReadContractParameters,
    type WalletClient,
    isAddress,
    zeroAddress,
} from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export type FunctionCall = Omit<ReadContractParameters<typeof abi>, 'abi' | 'address'>;

export default class UsdnProtocolContract {
    /** Client to use to read data from the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Client to use to send transactions to the smart contract */
    private readonly walletClient: WalletClient;
    /** The address of the USDN Protocol's smart contract */
    private readonly contractAddress: Address;

    constructor(contractAddress: Address, blockchainClient: PublicClient, walletClient: WalletClient) {
        if (!isAddress(contractAddress)) {
            throw new Error('Invalid Ethereum address for the USDN protocol');
        }

        this.contractAddress = contractAddress;
        this.blockchainClient = blockchainClient;
        this.walletClient = walletClient;
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
     * Simulate the validation of pending actions with the current parameters and return the amount that it would validate
     * @param priceData The price data for each actions that can be validated
     * @param rawIndices The raw indices corresponding to the price data entries
     * @returns The amount of validated pending actions
     */
    async simulateValidateActionablePendingActions(
        priceData: readonly Hex[],
        rawIndices: readonly bigint[],
    ): Promise<bigint> {
        const { result } = await this.blockchainClient.simulateContract({
            abi,
            address: this.contractAddress,
            blockTag: 'pending',
            account: this.walletClient.account,
            functionName: 'validateActionablePendingActions',
            args: [
                {
                    priceData,
                    rawIndices,
                },
                BigInt(rawIndices.length),
            ],
        });

        return result;
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
