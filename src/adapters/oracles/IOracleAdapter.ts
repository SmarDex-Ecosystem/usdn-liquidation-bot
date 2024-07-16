import type { OraclePriceData, OraclePriceUpdateCallback } from './types.js';

/** Allow to communicate with an oracle */
export default interface IOracleAdapter {
    /**
     * Get the latest price and its signature from the oracle
     * @returns The latest price and its signature
     */
    getLatestPrice(): Promise<OraclePriceData>;

    /**
     * Execute a callback whenever a new price is available
     * @param callback function to execute when a new price is received
     */
    subscribeToPriceUpdate(callback: OraclePriceUpdateCallback): Promise<void>;
}
