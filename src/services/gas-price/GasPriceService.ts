import type IGasPricedAdapter from '../../adapters/gas-price/IGasPrice.ts';
import type IGasPrice from '../../adapters/gas-price/IGasPrice.ts';

export default class GasPriceService implements IGasPrice {
    private primaryGasPriceAdapter: IGasPricedAdapter;
    private fallbackGasPriceAdapter: IGasPricedAdapter;

    constructor(primaryGasPriceAdapter: IGasPricedAdapter, fallbackGasPriceAdapter: IGasPricedAdapter) {
        this.primaryGasPriceAdapter = primaryGasPriceAdapter;
        this.fallbackGasPriceAdapter = fallbackGasPriceAdapter;
    }

    /** @inheritdoc */
    public async getGasPrice() {
        try {
            return this.primaryGasPriceAdapter.getGasPrice();
        } catch (error) {
            console.error(`Primary gas price source failed: ${error}`);
        }

        return this.fallbackGasPriceAdapter.getGasPrice();
    }
}
