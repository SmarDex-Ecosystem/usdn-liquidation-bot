import type IGasPricedAdapter from '../../adapters/gas-price/IGasPriceAdapter.ts';

export default class GasPriceService {
    private primaryGasPriceAdapter: IGasPricedAdapter;
    private fallbackGasPriceAdapter: IGasPricedAdapter;

    constructor(primaryGasPriceAdapter: IGasPricedAdapter, fallbackGasPriceAdapter: IGasPricedAdapter) {
        this.primaryGasPriceAdapter = primaryGasPriceAdapter;
        this.fallbackGasPriceAdapter = fallbackGasPriceAdapter;
    }

    public async getGasPrice() {
        try {
            return await this.primaryGasPriceAdapter.getGasPrice();
        } catch (error) {
            console.error(`Primary gas price source failed: ${error}`);
        }

        return this.fallbackGasPriceAdapter.getGasPrice();
    }
}
