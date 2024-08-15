import type { PublicClient } from 'viem';
import type IGasPrice from '../IGasPrice.ts';
export default class Viem implements IGasPrice {
    private client: PublicClient;

    constructor(newClient: PublicClient) {
        this.client = newClient;
    }

    /** @inheritDoc */
    async getGasPrice() {
        const gasPrice = await this.client.estimateFeesPerGas();

        return {
            fastPriorityFee: gasPrice.maxPriorityFeePerGas,
            suggestBaseFee: gasPrice.maxFeePerGas,
        };
    }
}
