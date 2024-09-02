import type IOracleAdapter from '../../adapters/oracles/IOracleAdapter.ts';

interface PriceRecord {
    timestamp: number;
    price: bigint;
    signature: string;
}

export default class LiquidationPriceHistory {
    private readonly oracleAdapter: IOracleAdapter;
    private history: PriceRecord[] = [];
    private readonly retentionPeriod = 30000;
    public cleanupIntervalId: NodeJS.Timeout | null = null;

    constructor(oracleAdapter: IOracleAdapter) {
        this.oracleAdapter = oracleAdapter;
    }

    public getHistory() {
        return [...this.history];
    }

    private addRecord(priceData: { price: bigint; signature: string }) {
        const timestamp = this.getCurrentTimestamp();
        this.history.push({ timestamp, ...priceData });
    }

    private getCurrentTimestamp() {
        return Date.now();
    }

    private cleanupOldRecords() {
        const cutoffTime = this.getCurrentTimestamp() - this.retentionPeriod;
        this.history = this.history.filter((record) => record.timestamp >= cutoffTime);
    }

    public async startListening() {
        if (this.cleanupIntervalId) {
            clearInterval(this.cleanupIntervalId);
        }
        this.cleanupIntervalId = setInterval(() => this.cleanupOldRecords(), 1000);

        this.oracleAdapter.subscribeToPriceUpdates((priceData) => {
            this.addRecord(priceData);
        });
    }

    public getSmallestPriceRecord() {
        if (this.history.length === 0) return null;

        return this.history.reduce((smallest, current) => (current.price < smallest.price ? current : smallest));
    }
}
