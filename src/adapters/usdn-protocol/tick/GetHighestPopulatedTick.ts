import type { PublicClient } from 'viem';
import { abi } from '../../../../abi/UsdnProtocolFallback.ts';
import type IGetHighestPopulatedTick from './IGetHighestPopulatedTick.ts';

export default class GetHighestPopulatedTick implements IGetHighestPopulatedTick {
    private contractAddress: string;
    private client: PublicClient;

    constructor(newClient: PublicClient, contractAddress: string) {
        this.client = newClient;
        this.contractAddress = contractAddress;
    }

    /** @inheritDoc */
    async getHighestPopulatedTick() {
        try {
            const result = await this.client.readContract({
                address: this.contractAddress as `0x${string}`,
                abi: abi,
                functionName: 'getHighestPopulatedTick',
            });

            return result;
        } catch (error) {
            throw new Error('Error while fetching the highest populated tick.');
        }
    }
}
