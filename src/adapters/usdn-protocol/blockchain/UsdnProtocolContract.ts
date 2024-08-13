import { isAddress, type PublicClient } from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export type AbiFunctionName = (typeof abi)[number] extends {
    type: 'function';
    name: infer T;
}
    ? T
    : never;

export type AbiFunctionArgs<T extends AbiFunctionName> = (typeof abi)[number] extends {
    type: 'function';
    name: T;
    inputs: infer I;
}
    ? { [K in keyof I]: I[K] extends { type: infer U } ? U : never }
    : never;

export default class UsdnProtocolContract {
    /** Client to use to communicate with the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Address of usdnProtocol */
    private readonly contractAddress: `0x${string}`;

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
        return this.handleContractInteraction('getHighestPopulatedTick');
    }

    /**
     * Calls multiple functions in the contract and returns the result
     * @param calls List of function names and their arguments to call
     * @returns Result of the multicall
     */
    async multicall<T extends AbiFunctionName>(calls: { functionName: T; args?: AbiFunctionArgs<T> }[]) {
        return this.handleMulticall(calls);
    }

    /** Handles interaction with the contract and returns the result */
    private async handleContractInteraction(functionName: AbiFunctionName) {
        return this.blockchainClient.readContract({
            address: this.contractAddress as `0x${string}`,
            abi: abi,
            functionName,
        });
    }

    /** Handles multicall interactions with the contract */
    private async handleMulticall<T extends AbiFunctionName>(
        calls: { functionName: AbiFunctionName; args?: AbiFunctionArgs<T> }[],
    ) {
        const contracts = calls.map((call) => ({
            address: this.contractAddress as `0x${string}`,
            abi: abi,
            functionName: call.functionName,
            args: [call.args],
        }));

        return this.blockchainClient.multicall({ contracts });
    }
}
