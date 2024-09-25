import type IGasPriceAdapter from '../IGasPriceAdapter.ts';
import { parseGwei } from 'viem';

type EtherscanData = {
    status: string;
    message: string;
    result: {
        LastBlock: string;
        SafeGasPrice: string;
        ProposeGasPrice: string;
        FastGasPrice: string;
        suggestBaseFee: string;
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
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data: EtherscanData = await response.json();
            if (data.status !== '1') {
                throw new Error(data.message);
            }

            const baseFee = parseGwei(data.result.suggestBaseFee);
            return {
                fastPriorityFee: parseGwei(data.result.FastGasPrice) - baseFee,
                suggestedBaseFee: baseFee,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to fetch gas price: ${errorMessage}`);
        }
    }
}
