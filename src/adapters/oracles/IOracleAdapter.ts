import type { OraclePriceData, OraclePriceUpdateCallback } from './types.ts';

/** Allow to communicate with an oracle */
export default interface IOracleAdapter {
    /**
     * Get the latest price and its signature from the oracle
     * @returns The latest price and its signature
     */
    getLatestPrice(): Promise<OraclePriceData>;

    /**
     * Get the price and its signature from the oracle for the provided timestamp
     * @returns The price and its signature
     */
    getPriceAtTimestamp(timestamp: number): Promise<OraclePriceData>;

    /**
     * Execute a callback whenever a new price is available
     * @param callback function to execute when a new price is received
     */
    subscribeToPriceUpdates(callback: OraclePriceUpdateCallback): Promise<void>;
}
