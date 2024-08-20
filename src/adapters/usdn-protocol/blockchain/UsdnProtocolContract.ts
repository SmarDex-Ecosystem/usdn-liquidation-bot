import { type ContractEventName, type ContractFunctionParameters, type PublicClient, isAddress } from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export type FunctionCall = Omit<ContractFunctionParameters<typeof abi>, 'abi' | 'address'>;

export default class UsdnProtocolContract {
    /** Client to use to communicate with the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Address of usdnProtocol */
    private readonly contractAddress: `0x${string}`;

    /** The highest populated tick */
    public highestPopulatedTick = 0;

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
        const newHighestPopulatedTick = await this.handleContractInteraction({
            functionName: 'getHighestPopulatedTick',
        });
        this.highestPopulatedTick = newHighestPopulatedTick;
        return newHighestPopulatedTick;
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

    /**
     * Watches any event emitted by the contract
     * @dev To stop watching the event, call the returned function
     * @param eventName Name of the event to watch
     * @returns The function to stop watching the event
     */
    watchEvent(eventName: ContractEventName<typeof abi>) {
        return this.blockchainClient.watchContractEvent({
            address: this.contractAddress,
            abi: abi,
            eventName: eventName,
            onLogs: (logs) => {
                if (logs.length > 0) {
                    const tick = logs[logs.length - 1] as { args: { tick: number } };
                    this.highestPopulatedTick = tick.args?.tick;
                }
            },
        });
    }
}
