import { encodeAbiParameters } from 'viem';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ChainlinkAdapter from './ChainlinkAdapter.js';
import type ChainlinkPriceFeedContract from './blockchain/ChainlinkPriceFeedContract.ts';
import type { RoundData } from './blockchain/types.ts';

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
        it('should throw an error as price subscription is not supported for Chainlink', async () => {
            const chainlinkAdapter = new ChainlinkAdapter(mockedContract);
            await expect(chainlinkAdapter.subscribeToPriceUpdates(() => {})).to.rejects.toThrowError(
                'Price subscription is not supported for Chainlink',
            );
        });
    });
});
