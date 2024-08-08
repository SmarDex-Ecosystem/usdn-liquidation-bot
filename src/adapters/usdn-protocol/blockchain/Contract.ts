import type { PublicClient } from 'viem';
import type IContract from './IContract.ts';
import { abi } from './UsdnProtocolFallback.ts';

type AbiFunctionNames = (typeof abi)[number] extends {
    type: 'function';
    name: infer T;
}
    ? T
    : never;

export default class UsdnProtocolContract implements IContract {
    /** Client to use to communicate with the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Address of usdnProtocol */
    private readonly contractAddress: string;

    constructor(blockchainClient: PublicClient, contractAddress: string) {
        this.blockchainClient = blockchainClient;
        this.contractAddress = contractAddress;
    }

    /** @inheritdoc */
    async getHighestPopulatedTick() {
        return this.handleContractInteraction('getHighestPopulatedTick');
    }

    /** @inheritdoc */
    async multicall() {
        return this.handleMulticall([{ functionName: 'getHighestPopulatedTick' }]);
    }

    /** Handles interaction with the contract and returns the result */
    private async handleContractInteraction(functionName: AbiFunctionNames) {
        try {
            const result = await this.blockchainClient.readContract({
                address: this.contractAddress as '0x${string}',
                abi: abi,
                functionName,
            });

            return result;
        } catch (error) {
            throw new Error(`Error while executing ${functionName}`);
        }
    }

    /** Handles multicall interactions with the contract */
    private async handleMulticall(calls: { functionName: string }[]) {
        try {
            const contracts = calls.map((call) => ({
                address: this.contractAddress as '0x${string}',
                abi: abi,
                functionName: call.functionName,
            }));

            const result = await this.blockchainClient.multicall({ contracts });

            return result;
        } catch (error) {
            return [{ error, status: 'failure' }];
        }
    }
}
