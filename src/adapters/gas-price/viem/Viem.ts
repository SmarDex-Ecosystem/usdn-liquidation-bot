import type { PublicActions } from 'viem';
import type IGasPriceAdapter from '../IGasPriceAdapter.ts';
export default class Viem implements IGasPriceAdapter {
    private client: PublicActions;

    constructor(getBlockchainClient: PublicActions) {
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
