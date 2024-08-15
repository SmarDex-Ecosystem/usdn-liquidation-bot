import axios from 'axios';
import type IGasPrice from '../IGasPrice.ts';
import { parseGwei } from 'viem';

type EtherscanData = {
    status: string;
    message: string;
    result: {
        LastBlock: number;
        SafeGasPrice: number;
        ProposeGasPrice: number;
        FastGasPrice: number;
        suggestBaseFee: number;
        gasUsedRatio: string;
    };
};
export default class Etherscan implements IGasPrice {
    private apiKeyToken: string | null = null;

    constructor(YourApiKeyToken: string) {
        this.apiKeyToken = YourApiKeyToken;
    }

    /** @inheritdoc */
    async getGasPrice() {
        const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${this.apiKeyToken}`;
        try {
            const response = await axios.get<EtherscanData>(url);
            if (response.data.status !== '1') {
                throw new Error(response.data.message);
            }
            return {
                high: parseGwei(response.data.result.FastGasPrice.toString()),
                baseFee: parseGwei(response.data.result.suggestBaseFee.toString()),
            };
        } catch (error) {
            throw new Error(`Failed to fetch gas price: ${(error as Error).message}`);
        }
    }
}
