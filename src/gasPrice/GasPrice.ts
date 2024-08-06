import type { PublicClient } from 'viem';
import type IGasPrice from './IGasPrice.js';
import { GasPriceFetchingError } from './types.js';

export default class GasPrice implements IGasPrice {
    private client: PublicClient | null = null;

    constructor(newClient: PublicClient) {
        this.client = newClient;
    }

    /** @inheritDoc */
    async getGasPrice() {
        if (!this.client) {
            throw new Error('Public client not initialized');
        }

        const gasPrice = await this.client.getGasPrice();
        if (!gasPrice) {
            throw new GasPriceFetchingError();
        }

        return {
            average: gasPrice,
            high: gasPrice * BigInt(2),
        };
    }
}
