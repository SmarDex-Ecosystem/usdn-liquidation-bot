import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LiquidationPriceHistory from './LiquidationPriceHistory.ts';
import type IOracleAdapter from '../../adapters/oracles/IOracleAdapter.ts';

describe('LiquidationPriceHistory', () => {
    let mockOracleAdapter: IOracleAdapter;
    let liquidationPriceHistory: LiquidationPriceHistory;
    const mockPriceData = { price: BigInt(352100000000), decimals: 18, signature: 'mock-signature' };

    beforeEach(() => {
        mockOracleAdapter = {
            subscribeToPriceUpdates: vi.fn(),
            getLatestPrice: vi.fn(),
            getPriceAtTimestamp: vi.fn(),
        } as unknown as IOracleAdapter;

        liquidationPriceHistory = new LiquidationPriceHistory(mockOracleAdapter);
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('should initialize with an empty history', () => {
        expect(liquidationPriceHistory.history).toEqual([]);
    });

    it('should add a new record when a price update is received', async () => {
        vi.mocked(mockOracleAdapter.subscribeToPriceUpdates).mockImplementationOnce(async (callback) => {
            await callback(mockPriceData);
        });

        await liquidationPriceHistory.watchNewPrices();

        const history = liquidationPriceHistory.history;
        expect(history).toHaveLength(1);
        expect(history[0].price).toBe(mockPriceData.price);
        expect(history[0].signature).toBe(mockPriceData.signature);
        expect(history[0].timestamp).toBeGreaterThanOrEqual(Date.now() - 3);
    });

    it('should clean up old records after the retention period', async () => {
        const oldTimestamp = Date.now() - 31000;

        liquidationPriceHistory.history.push({
            timestamp: oldTimestamp,
            price: BigInt(100),
            signature: 'old-signature',
        });

        await liquidationPriceHistory.watchNewPrices();

        const history = liquidationPriceHistory.history;
        expect(history).toHaveLength(0);
    });

    it('should keep records within the retention period', async () => {
        const currentTimestamp = Date.now();

        liquidationPriceHistory.history.push({
            timestamp: currentTimestamp,
            price: BigInt(100),
            signature: 'current-signature',
        });

        await liquidationPriceHistory.watchNewPrices();

        const history = liquidationPriceHistory.history;
        expect(history).toHaveLength(1);
        expect(history[0].timestamp).toBe(currentTimestamp);
    });

    it('should start a cleanup interval when watchNewPrices is called', async () => {
        await liquidationPriceHistory.watchNewPrices();
        expect(liquidationPriceHistory.cleanupIntervalId).not.toBeNull();
    });

    it('should stop the cleanup interval when manually set to null', async () => {
        await liquidationPriceHistory.watchNewPrices();
        if (liquidationPriceHistory.cleanupIntervalId) {
            clearInterval(liquidationPriceHistory.cleanupIntervalId);
        }

        liquidationPriceHistory.cleanupIntervalId = null;
        expect(liquidationPriceHistory.cleanupIntervalId).toBeNull();
    });

    it('should not add records if subscribeToPriceUpdates is not called', async () => {
        const history = liquidationPriceHistory.history;
        expect(history).toHaveLength(0);
    });

    it('should return the record with the smallest price', () => {
        liquidationPriceHistory.history = [
            { timestamp: Date.now(), price: BigInt(500), signature: 'sig1' },
            { timestamp: Date.now(), price: BigInt(300), signature: 'sig2' },
            { timestamp: Date.now(), price: BigInt(400), signature: 'sig3' },
        ];

        const smallestRecord = liquidationPriceHistory.getSmallestPriceRecord();
        expect(smallestRecord?.price).toBe(BigInt(300));
        expect(smallestRecord?.signature).toBe('sig2');
    });

    it('should return the only record if history contains a single record', () => {
        const timestamp = Date.now();
        const singleRecord = { timestamp, price: BigInt(100), signature: 'single-signature' };

        liquidationPriceHistory.history = [singleRecord];

        const result = liquidationPriceHistory.getSmallestPriceRecord();
        expect(result).toEqual(singleRecord);
    });

    it('should handle empty history gracefully', () => {
        liquidationPriceHistory.history = [];

        const result = liquidationPriceHistory.getSmallestPriceRecord();
        expect(result).toBeNull();
    });

    it('should handle multiple price updates over more than one minute and find the smallest price', async () => {
        vi.useFakeTimers();
        const priceUpdates = [
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

        await liquidationPriceHistory.watchNewPrices();

        vi.advanceTimersByTime(20000);

        let history = liquidationPriceHistory.history;
        expect(history).toHaveLength(2);
        expect(history.map((record) => record.price)).toContain(BigInt(500));
        expect(history.map((record) => record.price)).toContain(BigInt(300));
        let smallestRecord = liquidationPriceHistory.getSmallestPriceRecord();
        expect(smallestRecord?.price).toBe(BigInt(300));
        expect(smallestRecord?.signature).toBe('sig2');

        vi.advanceTimersByTime(50000);

        history = liquidationPriceHistory.history;
        expect(history).toHaveLength(1);
        expect(history.map((record) => record.price)).toContain(BigInt(250));
        smallestRecord = liquidationPriceHistory.getSmallestPriceRecord();
        expect(smallestRecord?.price).toBe(BigInt(250));
        expect(smallestRecord?.signature).toBe('sig4');

        vi.advanceTimersByTime(10000);

        history = liquidationPriceHistory.history;
        expect(history).toHaveLength(0);
        smallestRecord = liquidationPriceHistory.getSmallestPriceRecord();
        expect(smallestRecord).toBeNull();

        vi.useRealTimers();
    });
});
