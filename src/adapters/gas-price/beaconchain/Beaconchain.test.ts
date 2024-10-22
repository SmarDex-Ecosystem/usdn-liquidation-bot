import { afterEach, describe, expect, it, vi } from 'vitest';
import Beaconchain from './Beaconchain.ts';

const beaconchain = new Beaconchain();
describe('Beaconchain', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.unstubAllGlobals();
    });

    describe('getGasPrice', () => {
        it('should return valid data', async () => {
            const validResponse = {
                data: {
                    rapid: 4,
                    fast: 3,
                    standard: 2,
                    slow: 1,
                    timestamp: 1720000000,
                    price: 42.69,
                    priceUSD: 42.69,
                },
            };

            vi.stubGlobal(
                'fetch',
                vi.fn(() =>
                    Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(validResponse),
                    }),
                ),
            );

            const data = await beaconchain.getGasPrice();
            expect(data).toEqual({
                fastPriorityFee: BigInt(validResponse.data.rapid - validResponse.data.standard),
                suggestedBaseFee: BigInt(validResponse.data.standard),
            });
        });

        it('should throw an error when fetch throws an exception', async () => {
            const errorMessage = 'Network Error';

            vi.stubGlobal(
                'fetch',
                vi.fn(() => Promise.reject(new Error(errorMessage))),
            );

            await expect(beaconchain.getGasPrice()).rejects.toThrow(`Failed to fetch gas price: ${errorMessage}`);
        });

        it('should throw an error when fetch returns ok=false', async () => {
            const statusText = '45879';
            vi.stubGlobal(
                'fetch',
                vi.fn(() =>
                    Promise.resolve({
                        ok: false,
                        statusText: statusText,
                        json: () => Promise.resolve(),
                    }),
                ),
            );

            await expect(beaconchain.getGasPrice()).rejects.toThrow(
                `Failed to fetch gas price: Network response was not ok: ${statusText}`,
            );
        });
    });
});
