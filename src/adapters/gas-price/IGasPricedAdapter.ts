import type { GasPriceResult } from './types.ts';

/** Interface for a gas price adapter */
export default interface IGasPricedAdapter {
    /**
     * Get the gas price for a blockchain transaction
     * @returns The gas price data
     */
    getGasPrice(): Promise<GasPriceResult>;
}
