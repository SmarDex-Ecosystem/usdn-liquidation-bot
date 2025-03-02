import type { Hex } from 'viem';
import type AOracleAdapter from '../../adapters/oracles/AOracleAdapter.ts';
import type { OraclePriceData } from '../../adapters/oracles/types.ts';

export interface PriceRecord {
    timestamp: number;
    price: bigint;
    signature: Hex;
    oracleFee: bigint;
}

export default class LiquidationPriceHistory {
    private readonly oracleAdapter: AOracleAdapter;
    private readonly retentionPeriod = 30000;
    protected history: PriceRecord[] = [];
    protected cleanupIntervalId: NodeJS.Timeout | null = null;

    constructor(oracleAdapter: AOracleAdapter) {
        this.oracleAdapter = oracleAdapter;
    }

    private addRecord(timestamp: number, priceData: OraclePriceData, oracleFee: bigint) {
        this.history.push({ timestamp, oracleFee, ...priceData });
    }

    private cleanupOldRecords() {
        const validIndex = this.history.findIndex((record) => record.timestamp >= Date.now() - this.retentionPeriod);
        if (validIndex === -1) {
            this.history = [];
        } else {
            this.history = this.history.slice(validIndex);
        }

        return this.history;
    }

    private handleExitSignals() {
        if (this.cleanupIntervalId) {
            clearInterval(this.cleanupIntervalId);
        }
    }

    watchNewPrices() {
        if (this.cleanupIntervalId) {
            return;
        }
        this.cleanupIntervalId = setInterval(() => this.cleanupOldRecords(), 1000);

        this.oracleAdapter.subscribeToPriceUpdates((priceData) => {
            this.addRecord(Date.now(), priceData, this.oracleAdapter.VALIDATION_COST);
        });

        process.on('SIGTERM', this.handleExitSignals);
        process.on('SIGINT', this.handleExitSignals);
    }

    getSmallestPriceRecord() {
        if (this.history.length === 0) return null;

        return this.history.reduce((smallest, current) => (current.price < smallest.price ? current : smallest));
    }
}
