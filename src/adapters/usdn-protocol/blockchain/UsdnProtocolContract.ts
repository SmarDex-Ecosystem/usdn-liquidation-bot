import type { PublicClient } from 'viem';
import type IContract from './IUsdnProtocolContract.ts';
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
    private readonly contractAddress: `0x${string}`;

    constructor(blockchainClient: PublicClient, contractAddress: `0x${string}`) {
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
            return this.blockchainClient.readContract({
                address: this.contractAddress as '0x${string}',
                abi: abi,
                functionName,
            });
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

            return this.blockchainClient.multicall({ contracts });
        } catch (error) {
            return [{ error, status: 'failure' }];
        }
    }
}
