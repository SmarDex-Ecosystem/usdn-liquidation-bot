import { afterEach, describe, expect, it, vi } from 'vitest';
import PythAdapter from './PythAdapter.js';
import type { OraclePriceData } from '../types.js';

vi.mock('@pythnetwork/price-service-client');

const validPythData = {
    emaPrice: {
        conf: '297132900',
        expo: -8,
        price: '335409030000',
        publishTime: 1721032490,
    },
    id: 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    metadata: undefined,
    vaa: 'UE5BVQEAAAADuAEAAAAEDQDFhUQ7/WwmcC+G9ROFwp0bVC22gFSc4CmxVJqrJYvb5B7D3DCrWB/oUhcSjfr765nBsvXa9VHrfcOTHbTQE/P3AQI7RBKkURjQVt2KpsM8TVV/QVn0FNuxLVu5oXY9vo2k0R74B0sxxUa0OfchRgk5D7pR93g6Ebl6IoyVFYhBEcPeAAMoVWieKwo1y6VLCA9vxt/ZxONwToiTLS564LXJPNh7VHIjRobvmfc0n73apTDXdssrnkfLn3sX3tsaca7WYMcJAQQ5JAaFI8lQuD0J6sdCAE5hbmIlmdCiGwvixZCOFEe12kqjcmRy+G/B/lrVnsEOeobcviiDipfItTz0Mj91At5CAQaWmnkJztna5UVoKSyyT8KBpoz+XIMfUzdgxEFlUssHYjdeeBwR8dLTWhhR8JNdxvXt4QtIf2DeuDDECAR8VWonAQhfcMSSQR/LENhJLqXsYKefWScPmz2r8JwZQWU8f573R2CdH/1e7SXQRkEGK8A/sPq7jkiJ6aMVTZyDKr7BIAa3AAvgcGy39hcZEV57w2klizbITg8Ej+YBZ/jfbB00uMAN8UvdNviIcYLQ1ah8ZE48JtO9SORlzM64z/xxLMsdQvAyAQwO/9SMdVQaZClBWp87+6mUE3L69lqPe1ln2965NM5A+DXtD64p6KSX7bV2CULgodn/uI88bsWn4ofQaUxXrqqwAA0/vJlsq3incOK4Eee9EOKIIyu/2lCu6822IhbhZBrx3G4/7tLUWF2nj79JbtmprQxeU0Uj3bnE0D8oeSkRnXBYAQ4ovloEuItJu+xSrcgrlU0vVPsLVyq8FmcukfZckiHsGgPOBFRGm1Fnb+HvKeG/rX0pzfHKRbp/+sjGj4gn8XG3AA8HDBCcYbvThTPmoO7piRbTZSpqC8C9/IxcEWAMbERuch9SHQms5vUSa9Pa6bGg/07cxeeiRrN/Uv1dE7eeFmtSARCYMxUNTidogbyqFZLEGl4ZCxn3yIwnFYBAVI9Y3mgRUkV1rURtL6PaCobOQzzwFRPwt+3r+uLxV8eR1Lw6o1D3ABIrv7jczixEi9BdKW0LWeRIhHG8KM4bF/ttveY39/glhm28VR6sUvTLwM0c+nDbNbnhB1Y8gQx///+YXb/9/hpAAWaU3yoAAAAAABrhAfrtrFhR4yubI7X5QRqMK6xKrj7U3XuBHdGnLqSqcQAAAAAEG3elAUFVV1YAAAAAAAkl/bsAACcQoKjljt5cVPablgrTs8lP299jnvABAFUA/2FJGpMREt3xvYFHzRtkE3X3n1glEm1mVICHRjT9Cs4AAABOUW2cdQAAAAARvEN7////+AAAAABmlN8qAAAAAGaU3ykAAABOF++jcAAAAAARteNkCws1u1V7wcoDNXdYFjL0NYl7SJJZEVmvK6TulZV0Z+fNF0Kd+a8irRaE8m6SS/wCxcUwYX3YB9Ges9LQrBuW2SA2/qz+ekZZDRdROl2XjWrWY3UfGm/ufkCZD8sp+DENnfWu/HJrf7VPj6BV/0TEBcPIIfWhHeUoK4jxZVOuEhyil4tUzAW1gri8XrJXmrl/0loBAxGZ/nJZm6xc04jLo0NCXZKjnkRjeEZmjHB+n4mh3mOuLSFGcxQ+3A/4IblhSQNEDT7tBoy68wxDtepbTXVYngvji2DRZMpdl1Y=',
    price: {
        conf: '297550715',
        expo: -8,
        price: '336373587061',
        publishTime: 1721032490,
    },
};
const priceFeedData = [
    {
        ...validPythData,
        getPriceNoOlderThan: () => validPythData.price,
    },
];

describe('PythAdapter', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('getLatestPrice', () => {
        it('should return valid data', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.getLatestPriceFeeds = vi
                .fn()
                .mockImplementation(async () => {
                    return priceFeedData;
                });

            const pythAdapter = new PythAdapter();
            const data = await pythAdapter.getLatestPrice();
            expect(data.price).toEqual(BigInt(validPythData.price.price));
            expect(data.decimals).toEqual(8);
            expect(data.signature).toEqual(validPythData.vaa);
        });

        it('should throw an error when the client throws an error', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.getLatestPriceFeeds = vi
                .fn()
                .mockRejectedValue(new Error('mocked error'));
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Failed to get data from Pyth');
        });

        it('should throw an error when the client returns empty data', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.getLatestPriceFeeds = vi
                .fn()
                .mockImplementation(async () => {
                    return undefined;
                });
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Pyth returned empty data');
        });

        it('should throw an error when the client returns an empty array', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.getLatestPriceFeeds = vi
                .fn()
                .mockImplementation(async () => {
                    return [];
                });
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Pyth returned empty data');
        });

        it('should throw an error when the client cannot return a recent price', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.getLatestPriceFeeds = vi
                .fn()
                .mockImplementation(async () => {
                    const priceFeedDataModified = [
                        {
                            ...validPythData,
                            getPriceNoOlderThan: () => undefined,
                        },
                    ];
                    return priceFeedDataModified;
                });
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('No recent price available from Pyth');
        });

        it('should throw an error when the returned data does not contain a signature', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.getLatestPriceFeeds = vi
                .fn()
                .mockImplementation(async () => {
                    const priceFeedDataModified = [
                        {
                            ...priceFeedData[0],
                            vaa: undefined,
                        },
                    ];
                    return priceFeedDataModified;
                });
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow(
                'Pyth did not return a signature for their price',
            );
        });
    });

    describe('subscribeToPriceUpdate', () => {
        it('should execute the callback on price update', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.subscribePriceFeedUpdates = vi
                .fn()
                .mockImplementation(async (_priceFeeds, cb) => {
                    cb(priceFeedData[0]);
                });

            const callback = vi.fn();
            const pythAdapter = new PythAdapter();
            await pythAdapter.subscribeToPriceUpdate(callback);

            expect(callback).toHaveBeenCalledWith({
                price: BigInt(validPythData.price.price),
                decimals: 8,
                signature: validPythData.vaa,
            } as OraclePriceData);
        });

        it('should not execute the callback if the returned data by `getPriceNoOlderThan` is empty', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.subscribePriceFeedUpdates = vi
                .fn()
                .mockImplementation(async (_priceFeeds, cb) => {
                    const priceFeedDataModified = [
                        {
                            ...validPythData,
                            getPriceNoOlderThan: () => undefined,
                        },
                    ];
                    cb(priceFeedDataModified);
                });

            const callback = vi.fn();
            const pythAdapter = new PythAdapter();
            await pythAdapter.subscribeToPriceUpdate(callback);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('should not execute the callback if the data does not contain a signature', async () => {
            const mockedClient = await import('@pythnetwork/price-service-client');
            vi.mocked(mockedClient).PriceServiceConnection.prototype.subscribePriceFeedUpdates = vi
                .fn()
                .mockImplementation(async (_priceFeeds, cb) => {
                    const priceFeedDataModified = [
                        {
                            ...priceFeedData[0],
                            vaa: undefined,
                        },
                    ];
                    cb(priceFeedDataModified);
                });

            const callback = vi.fn();
            const pythAdapter = new PythAdapter();
            await pythAdapter.subscribeToPriceUpdate(callback);

            expect(callback).toHaveBeenCalledTimes(0);
        });
    });
});
