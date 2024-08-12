import type { PublicClient } from 'viem';
import type IGasPrice from '../IGasPrice.ts';
export default class Viem implements IGasPrice {
    private client: PublicClient;

    constructor(newClient: PublicClient) {
        this.client = newClient;
    }

    /** @inheritDoc */
    async getGasPrice() {
        const gasPrice = await this.client.getGasPrice();

        return {
            high: gasPrice * BigInt(2),
            baseFee: 0n,
        };
    }
}
