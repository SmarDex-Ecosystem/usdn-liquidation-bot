import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LiquidationPriceHistory, { type PriceRecord } from './LiquidationPriceHistory.ts';
import type IOracleAdapter from '../../adapters/oracles/IOracleAdapter.ts';
import type { OraclePriceData } from '../../adapters/oracles/types.ts';

class LiquidationPriceHistoryExtended extends LiquidationPriceHistory {
    public getHistory() {
        return this.history;
    }

    public getCleanupIntervalId() {
        return this.cleanupIntervalId;
    }

    public forceAddRecord(timestamp: number, priceData: OraclePriceData) {
        this.history.push({ timestamp, ...priceData });
    }
}

describe('LiquidationPriceHistory', () => {
    let mockOracleAdapter: IOracleAdapter;
    let liquidationPriceHistory: LiquidationPriceHistoryExtended;
    const mockPriceData: OraclePriceData = { price: BigInt(352100000000), decimals: 18, signature: 'mock-signature' };

    beforeEach(() => {
        mockOracleAdapter = {
            subscribeToPriceUpdates: vi.fn(),
            getLatestPrice: vi.fn(),
            getPriceAtTimestamp: vi.fn(),
        } as unknown as IOracleAdapter;

        liquidationPriceHistory = new LiquidationPriceHistoryExtended(mockOracleAdapter);
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('watchNewPrices', () => {
        it('should initialize with an empty history', () => {
            expect(liquidationPriceHistory.getHistory()).toEqual([]);
        });

        it('should add a new record when a price update is received', async () => {
            const updateDate = Date.now();
            vi.mocked(mockOracleAdapter.subscribeToPriceUpdates).mockImplementationOnce(async (callback) => {
                callback(mockPriceData);
            });

            liquidationPriceHistory.watchNewPrices();

            const history = liquidationPriceHistory.getHistory();
            expect(history).toHaveLength(1);
            expect(history[0].price).toBe(mockPriceData.price);
            expect(history[0].signature).toBe(mockPriceData.signature);
            expect(history[0].timestamp).toBeGreaterThanOrEqual(updateDate);
        });

        it('should not add records if subscribeToPriceUpdates is not called', async () => {
            const history = liquidationPriceHistory.getHistory();
            expect(history).toHaveLength(0);
        });

        it('should start a cleanup interval when watchNewPrices is called', async () => {
            liquidationPriceHistory.watchNewPrices();
            expect(liquidationPriceHistory.getCleanupIntervalId()).not.toBeNull();
        });

        it('should handle empty history gracefully', () => {
            liquidationPriceHistory.watchNewPrices();

            const result = liquidationPriceHistory.getSmallestPriceRecord();
            expect(result).toBeNull();
        });

        it('should handle multiple price updates over more than one minute', async () => {
            vi.useFakeTimers();
            const priceUpdates: OraclePriceData[] = [
                { price: BigInt(500), decimals: 18, signature: 'sig1' },
                { price: BigInt(300), decimals: 18, signature: 'sig2' },
                { price: BigInt(400), decimals: 18, signature: 'sig3' },
                { price: BigInt(250), decimals: 18, signature: 'sig4' },
            ];

            vi.mocked(mockOracleAdapter.subscribeToPriceUpdates).mockImplementationOnce(async (callback) => {
                let index = 0;
                const intervalId = setInterval(async () => {
                    if (index >= priceUpdates.length) {
                        clearInterval(intervalId);
                        return;
                    }
                    callback(priceUpdates[index]);
                    index++;
                }, 10000);
            });

            liquidationPriceHistory.watchNewPrices();

            vi.advanceTimersByTime(20000);

            let history = liquidationPriceHistory.getHistory();
            expect(history).toHaveLength(2);
            expect(history.map((record: PriceRecord) => record.price)).toContain(BigInt(500));
            expect(history.map((record: PriceRecord) => record.price)).toContain(BigInt(300));

            vi.advanceTimersByTime(50000);

            history = liquidationPriceHistory.getHistory();
            expect(history).toHaveLength(1);
            expect(history.map((record: PriceRecord) => record.price)).toContain(BigInt(250));

            vi.advanceTimersByTime(10000);

            history = liquidationPriceHistory.getHistory();
            expect(history).toHaveLength(0);

            vi.useRealTimers();
        });
    });

    describe('getSmallestPriceRecord', () => {
        it('should handle multiple price updates over more than one minute and find the smallest price', async () => {
            vi.useFakeTimers();
            const priceUpdates: OraclePriceData[] = [
                { price: BigInt(500), decimals: 18, signature: 'sig1' },
                { price: BigInt(300), decimals: 18, signature: 'sig2' },
                { price: BigInt(400), decimals: 18, signature: 'sig3' },
                { price: BigInt(250), decimals: 18, signature: 'sig4' },
            ];

            const initDate = Date.now();
            liquidationPriceHistory.forceAddRecord(initDate - 230, priceUpdates[0]);
            liquidationPriceHistory.forceAddRecord(initDate - 200, priceUpdates[1]);
            liquidationPriceHistory.forceAddRecord(initDate, priceUpdates[2]);
            liquidationPriceHistory.forceAddRecord(initDate + 100, priceUpdates[3]);

            const smallestRecord = liquidationPriceHistory.getSmallestPriceRecord();
            expect(smallestRecord?.price).toBe(BigInt(250));
            expect(smallestRecord?.signature).toBe('sig4');
        });

        it('should return null if history is empty', () => {
            const result = liquidationPriceHistory.getSmallestPriceRecord();
            expect(result).toBeNull();
        });
    });
});
