import type { PublicClient } from 'viem';
import type IGasPrice from '../IGasPrice.ts';
export default class Viem implements IGasPrice {
    private client: PublicClient;

    constructor(getBlockchainClient: PublicClient) {
        this.client = getBlockchainClient;
    }

    /** @inheritDoc */
    async getGasPrice() {
        const gasPrice = await this.client.estimateFeesPerGas();

        return {
            fastPriorityFee: gasPrice.maxPriorityFeePerGas,
            suggestedBaseFee: gasPrice.maxFeePerGas,
        };
    }
}
