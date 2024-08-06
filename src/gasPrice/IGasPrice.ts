import type { GasPriceData } from './types.js';

/** Allow to communicate with the RPC */
export default interface IGasPrice {
    /**
     * Get the gas price from the RPC
     * @returns The gas price data
     */
    getGasPrice(): Promise<GasPriceData>;
}
