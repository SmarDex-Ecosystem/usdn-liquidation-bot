import { OracleType, type OraclePriceData, type OraclePriceUpdateCallback } from './types.ts';

/** Allow to get price data from an oracle */
export default abstract class AOracleAdapter {
    /** How much ether it costs (in wei) to use that oracle */
    readonly VALIDATION_COST: bigint = 0n;

    /**
     * Get the latest price data from the oracle
     * @returns The latest price and its signature
     */
    abstract getLatestPrice(): Promise<OraclePriceData>;

    /**
     * Get the closest price data from the oracle after the provided timestamp
     * @returns The price and its signature
     */
    abstract getPriceAtTimestamp(timestamp: number): Promise<OraclePriceData>;

    /**
     * Execute a callback whenever a new price is available
     * @param callback function to execute when a new price is received
     */
    abstract subscribeToPriceUpdates(callback: OraclePriceUpdateCallback): Promise<void>;
}

export abstract class ALowLatencyOracle extends AOracleAdapter {
    /** The type of oracle this adapter is */
    readonly TYPE = OracleType.LowLatency;
}

export abstract class AHighLatencyOracle extends AOracleAdapter {
    /** The type of oracle this adapter is */
    readonly TYPE = OracleType.HighLatency;
}
