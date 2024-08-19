import axios from 'axios';
import { parseGwei } from 'viem';
import type IGasPriceAdapter from '../IGasPriceAdapter.ts';

type EtherscanData = {
    status: string;
    message: string;
    result: {
        LastBlock: number;
        SafeGasPrice: number;
        ProposeGasPrice: number;
        FastGasPrice: number;
        suggestedBaseFee: number;
        gasUsedRatio: string;
    };
};
export default class Etherscan implements IGasPriceAdapter {
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
            const baseFee = parseGwei(response.data.result.suggestedBaseFee.toString());
            return {
                fastPriorityFee: parseGwei(response.data.result.FastGasPrice.toString()) - baseFee,
                suggestedBaseFee: baseFee,
            };
        } catch (error) {
            throw new Error(`Failed to fetch gas price: ${(error as Error).message}`);
        }
    }
}
