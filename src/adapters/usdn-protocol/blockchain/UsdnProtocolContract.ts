import { type ContractFunctionParameters, type PublicClient, isAddress } from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export type FunctionCall = Omit<ContractFunctionParameters<typeof abi>, 'abi' | 'address'>;

export default class UsdnProtocolContract {
    /** Client to use to communicate with the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Address of usdnProtocol */
    private readonly contractAddress: `0x${string}`;

    /** The highest populated tick */
    public highestPopulatedTickStored = 0;

    constructor(blockchainClient: PublicClient, contractAddress: `0x${string}`) {
        if (!isAddress(contractAddress)) {
            throw new Error('Invalid Ethereum address.');
        }
        this.blockchainClient = blockchainClient;
        this.contractAddress = contractAddress;
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

    /** Watch an Event */
    watchEvent() {
        return this.blockchainClient.watchContractEvent({
            address: this.contractAddress,
            abi: abi,
            eventName: 'HighestPopulatedTickUpdated',
            onLogs: (logs) => {
                if (logs.length > 0) {
                    const tick = logs[logs.length - 1] as { args: { tick: number } };
                    this.highestPopulatedTickStored = tick.args?.tick;
                }
            },
        });
    }
}
