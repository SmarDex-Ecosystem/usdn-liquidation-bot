import type { PublicClient } from 'viem';
import type IGasPriceAdapter from '../IGasPriceAdapter.ts';
export default class Viem implements IGasPriceAdapter {
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
