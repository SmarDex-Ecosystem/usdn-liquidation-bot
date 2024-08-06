import type { PublicClient } from 'viem';
import { newClient } from '../utils/index.ts';
import type IGasPrice from './IGasPrice.js';
import { GasPriceFetchingError } from './types.js';

export default class GasPrice implements IGasPrice {
    private client: PublicClient | null = null;

    constructor() {
        const rpcUrl = process.env.RPC_URL;
        if (!rpcUrl) {
            throw new Error('RPC URL not set');
        }

        this.initializeClient(rpcUrl);
    }

    private async initializeClient(rpcUrl: string) {
        try {
            this.client = await newClient(rpcUrl);
        } catch (error) {
            console.error('Failed to initialize public client:', error);
            throw new Error('Failed to initialize public client');
        }
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
