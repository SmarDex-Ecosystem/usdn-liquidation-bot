import axios from 'axios';
import type IGasPricedAdapter from '../IGasPricedAdapter.ts';

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
export default class Etherscan implements IGasPricedAdapter {
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
                throw new Error(`Error fetching gas oracle data: ${response.data.message}`);
            }
            return {
                high: BigInt(response.data.result.FastGasPrice) * 10n ** 9n,
                baseFee: BigInt(response.data.result.suggestBaseFee) * 10n ** 9n,
            };
        } catch (error) {
            throw new Error(`Error retrieving gas price from Etherscan: ${error}`);
        }
    }
}
