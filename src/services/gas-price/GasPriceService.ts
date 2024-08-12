import type IGasPricedAdapter from '../../adapters/gas-price/IGasPricedAdapter.ts';
import type IGasPriceService from './IGasPriceService.ts';

export default class GasPriceService implements IGasPriceService {
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
