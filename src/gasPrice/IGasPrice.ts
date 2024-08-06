import type { GasPriceData } from './types.js';

/** Allow to communicate with the RPC */
export default interface IGasPrice {
    /**
     * Get the gas price for a blockchain transaction
     * @returns The gas price data
     */
    getGasPrice(): Promise<GasPriceData>;
}
