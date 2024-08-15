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
    private apiKey: string | null = null;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /** @inheritdoc */
    async getGasPrice() {
        const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${this.apiKey}`;
        try {
            const response = await axios.get<EtherscanData>(url);
            if (response.data.status !== '1') {
                throw new Error(response.data.message);
            }
            const baseFee = parseGwei(response.data.result.suggestBaseFee.toString());
            return {
                fastPriorityFee: parseGwei(response.data.result.FastGasPrice.toString()) - baseFee,
                suggestBaseFee: baseFee,
            };
        } catch (error) {
            throw new Error(`Failed to fetch gas price: ${(error as Error).message}`);
        }
    }
}
