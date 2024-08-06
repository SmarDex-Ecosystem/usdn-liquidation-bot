import type { GasPriceData } from './types.js';

/** Interface for a gas price provider */
export default interface IGasPrice {
    /**
     * Get the gas price for a blockchain transaction
     * @returns The gas price data
     */
    getGasPrice(): Promise<GasPriceData>;
}
