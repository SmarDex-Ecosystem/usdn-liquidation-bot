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
        this.history = this.history.filter((record) => record.timestamp >= Date.now() - this.retentionPeriod);
    }

    watchNewPrices() {
        if (this.cleanupIntervalId) {
            clearInterval(this.cleanupIntervalId);
        }
        this.cleanupOldRecords();
        this.cleanupIntervalId = setInterval(() => this.cleanupOldRecords(), 1000);

        this.oracleAdapter.subscribeToPriceUpdates((priceData) => {
            this.addRecord(Date.now(), priceData);
        });
    }

    public getSmallestPriceRecord() {
        if (this.history.length === 0) return null;

        return this.history.reduce((smallest, current) => (current.price < smallest.price ? current : smallest));
    }
}
