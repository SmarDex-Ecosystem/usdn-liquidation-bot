import { type ContractFunctionParameters, type PublicClient, isAddress } from 'viem';
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
     * Watches for updates of the highest populated tick and update the `highestPopulatedTick` variable when needed
     * @dev To stop watching the event, call the returned function
     * @returns The function to stop watching the event
     */
    watchForHighestTickUpdate() {
        return this.blockchainClient.watchContractEvent({
            address: this.contractAddress,
            abi: abi,
            eventName: 'HighestPopulatedTickUpdated',
            onLogs: (logs) => {
                if (logs.length > 0) {
                    const log = logs[logs.length - 1];
                    if (log.args.tick === undefined) {
                        throw new Error(
                            `HighestPopulatedTickUpdated event with invalid tick in TX hash ${log.transactionHash}`,
                        );
                    }

                    this.highestPopulatedTick = log.args.tick;
                }
            },
        });
    }
}
