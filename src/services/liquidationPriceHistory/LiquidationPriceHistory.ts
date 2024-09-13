import type IOracleAdapter from '../../adapters/oracles/IOracleAdapter.ts';
import type { OraclePriceData } from '../../adapters/oracles/types.ts';

interface PriceRecord {
    timestamp: number;
    price: bigint;
    signature: string;
}

export default class LiquidationPriceHistory {
    private readonly oracleAdapter: IOracleAdapter;
    private readonly retentionPeriod = 30000;
    public history: PriceRecord[] = [];
    public cleanupIntervalId: NodeJS.Timeout | null = null;

    constructor(oracleAdapter: IOracleAdapter) {
        this.oracleAdapter = oracleAdapter;
    }

    private addRecord(timestamp: number, priceData: OraclePriceData) {
        this.history.push({ timestamp, ...priceData });
    }

    private cleanupOldRecords() {
        let index = 0;
        for (
            ;
            index < this.history.length && this.history[index].timestamp < Date.now() - this.retentionPeriod;
            index++
        );
        this.history = this.history.slice(index);
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
            this.addRecord(Date.now(), priceData);
        });

        process.on('SIGTERM', this.handleExitSignals);
        process.on('SIGINT', this.handleExitSignals);
    }

    public getSmallestPriceRecord() {
        if (this.history.length === 0) return null;

        return this.history.reduce((smallest, current) => (current.price < smallest.price ? current : smallest));
    }
}
