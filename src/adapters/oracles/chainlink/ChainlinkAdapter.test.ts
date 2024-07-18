import { afterEach, describe, expect, it, vi } from 'vitest';
import ChainlinkAdapter from './ChainlinkAdapter.js';
import { encodeAbiParameters } from 'viem';

vi.mock('dev3-sdk');

const validChainlinkData = {
    answer: 3000n * 10n ** 18n,
    roundID: 69420,
};

describe('ChainlinkAdapter', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.unstubAllEnvs();
    });

    describe('constructor', () => {
        it('should throw an error if the RPC_URL env variable is not set', async () => {
            vi.stubEnv('RPC_URL', '');
            expect(() => {
                new ChainlinkAdapter();
            }).to.throw('RPC URL not set');
        });
    });

    describe('getLatestPrice', () => {
        it('should return valid data', async () => {
            const mockedClient = await import('dev3-sdk');
            vi.mocked(mockedClient).Chainlink.instance = vi.fn().mockImplementation(() => {
                return {
                    async getFromOracle() {
                        return validChainlinkData;
                    },
                    feeds: { ETH_USD: 1 },
                };
            });
            const chainlinkAdapter = new ChainlinkAdapter();
            const data = await chainlinkAdapter.getLatestPrice();

            expect(data.price).to.equal(3000n * 10n ** 18n);
            expect(data.decimals).to.equal(18);
            expect(data.signature).to.equal(encodeAbiParameters([{ name: 'test', type: 'uint80' }], [69420n]));
        });
    });

    describe('subscribeToPriceUpdate', () => {
        it('should throw an error as price subscription is not supported for Chainlink', async () => {
            const chainlinkAdapter = new ChainlinkAdapter();
            await expect(chainlinkAdapter.subscribeToPriceUpdate(() => {})).to.rejects.toThrowError(
                'Price subscription is not supported for Chainlink',
            );
        });
    });
});
