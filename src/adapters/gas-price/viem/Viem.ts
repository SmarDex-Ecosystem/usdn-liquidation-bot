import type { PublicClient } from 'viem';
import type IGasPricedAdapter from '../IGasPricedAdapter.ts';

export default class Viem implements IGasPricedAdapter {
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
