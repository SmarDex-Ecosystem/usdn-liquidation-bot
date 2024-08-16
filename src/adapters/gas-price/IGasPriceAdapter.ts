import type { GasPriceResult } from './types.ts';

/** Allows to get the price of the gas from an external provider */
export default interface IGasPriceAdapter {
    /**
     * Get the gas price for a blockchain transaction
     * @returns The gas price data
     */
    getGasPrice(): Promise<GasPriceResult>;
}
