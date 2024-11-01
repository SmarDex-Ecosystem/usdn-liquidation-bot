import type IGasPriceAdapter from '../IGasPriceAdapter.ts';

/** Structure of the Beaconchain API's response */
type BeaconchainData = {
    code: number;
    data: {
        rapid: number;
        fast: number;
        standard: number;
        slow: number;
        timestamp: number;
        price: number;
        priceUSD: number;
    };
};

/** Gas price adapter for the API of Beaconcha.in for the Sepolia network */
export default class Beaconchain implements IGasPriceAdapter {
    private API_ENDPOINT = 'https://sepolia.beaconcha.in/api/v1/execution/gasnow';

    /** @inheritdoc */
    async getGasPrice() {
        try {
            const response = await fetch(this.API_ENDPOINT);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const { data } = (await response.json()) as BeaconchainData;
            const baseFee = BigInt(data.standard);
            return {
                fastPriorityFee: BigInt(data.rapid) - baseFee,
                // Use a value 50% higher than the standard fee as the suggested base fee to avoid underestimation
                suggestedBaseFee: baseFee + baseFee / 2n,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to fetch gas price: ${errorMessage}`);
        }
    }
}
