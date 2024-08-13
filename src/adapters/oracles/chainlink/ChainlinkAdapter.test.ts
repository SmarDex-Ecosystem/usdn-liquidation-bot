import { encodeAbiParameters } from 'viem';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ChainlinkAdapter from './ChainlinkAdapter.js';
import type ChainlinkPriceFeedContract from './blockchain/ChainlinkPriceFeedContract.ts';
import type { RoundData } from './blockchain/types.ts';

vi.mock('../../../utils/index.ts');

const mockedContract = (await vi.importMock(
    './blockchain/ChainlinkPriceFeedContract.ts',
)) as unknown as ChainlinkPriceFeedContract;
const validChainlinkData: RoundData = {
    price: 3000n * 10n ** 8n,
    timestamp: 42069n,
    roundId: 69420n,
    decimals: 8,
};

describe('ChainlinkAdapter', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('getLatestPrice', () => {
        it('should return valid data', async () => {
            mockedContract.getLatestRoundData = vi.fn().mockImplementation(() => {
                return validChainlinkData;
            });

            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            const data = await chainlinkAdapter.getLatestPrice();

            expect(data.price).to.equal(3000n * 10n ** 8n);
            expect(data.decimals).to.equal(8);
            expect(data.signature).to.equal(encodeAbiParameters([{ name: 'test', type: 'uint80' }], [69420n]));
        });
        it('should throw an error if the data fetching fails', async () => {
            mockedContract.getLatestRoundData = vi.fn().mockImplementation(() => {
                throw new Error('test');
            });

            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await expect(chainlinkAdapter.getLatestPrice()).to.rejects.toThrowError(
                'Failed to get data from Chainlink',
            );
        });
    });

    describe('getPriceAtTimestamp', () => {
        it('should return valid data', async () => {
            mockedContract.getRoundDataAfterTimestamp = vi.fn().mockImplementation(() => {
                return validChainlinkData;
            });

            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            const data = await chainlinkAdapter.getPriceAtTimestamp(42069);

            expect(data.price).to.equal(3000n * 10n ** 8n);
            expect(data.decimals).to.equal(8);
            expect(data.signature).to.equal(encodeAbiParameters([{ name: 'test', type: 'uint80' }], [69420n]));
        });
        it('should throw an error if the data fetching fails', async () => {
            mockedContract.getRoundDataAfterTimestamp = vi.fn().mockImplementation(() => {
                throw new Error('test');
            });

            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await expect(chainlinkAdapter.getPriceAtTimestamp(42069)).to.rejects.toThrowError(
                'Failed to get data from Chainlink',
            );
        });
        it('should throw an error if the data returned is null', async () => {
            mockedContract.getRoundDataAfterTimestamp = vi.fn().mockImplementation(() => {
                return null;
            });

            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await expect(chainlinkAdapter.getPriceAtTimestamp(42069)).to.rejects.toThrowError(
                'No price found for this timestamp',
            );
        });
    });

    describe('subscribeToPriceUpdate', () => {
        beforeEach(async () => {
            const mockedUtils = await import('../../../utils/index.ts');
            vi.mocked(mockedUtils).sleep = vi.fn();
        });

        it('should execute the callback on the first iteration', async () => {
            mockedContract.getLatestRoundData = vi.fn().mockImplementation(() => {
                // stop the polling after the first iteration
                process.emit('SIGINT');
                return validChainlinkData;
            });

            const callback = vi.fn();
            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await chainlinkAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledOnce();
        });

        it('should execute the callback only when the round ID changes', async () => {
            const newRoundData = { ...validChainlinkData, roundId: validChainlinkData.roundId + 1n };
            mockedContract.getLatestRoundData = vi
                .fn()
                .mockImplementationOnce(() => {
                    return validChainlinkData;
                })
                .mockImplementationOnce(() => {
                    return validChainlinkData;
                })
                .mockImplementation(() => {
                    return newRoundData;
                })
                .mockImplementation(() => {
                    // stop the polling after the fourth iteration
                    process.emit('SIGINT');
                    return newRoundData;
                });

            const callback = vi.fn();
            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await chainlinkAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledTimes(2);
        });

        it('should not execute the callback, not throw an error and continue to poll if the price fetching fails', async () => {
            mockedContract.getLatestRoundData = vi
                .fn()
                .mockImplementationOnce(() => {
                    return validChainlinkData;
                })
                .mockImplementationOnce(() => {
                    throw new Error();
                })
                .mockImplementationOnce(() => {
                    // stop the polling after the first iteration
                    process.emit('SIGTERM');
                    return { ...validChainlinkData, roundId: validChainlinkData.roundId + 1n };
                });

            const callback = vi.fn();
            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await chainlinkAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledTimes(2);
        });
    });
});
