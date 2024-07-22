import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RedstoneAdapter from './RedstoneAdapter.ts';

vi.mock('@redstone-finance/sdk');
vi.mock('../../../utils/index.ts');

const validRedstoneData = {
    ETH: [
        {
            dataPackage: {
                dataPoints: [
                    {
                        // biome-ignore format: unnecessary
                        value: [
                            0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 116, 106, 82, 136, 0, // 500000000000n
                        ],
                    },
                ],
            },
            signature: {
                compact: 'mockedSignature',
            },
        },
    ],
};

describe('RedstoneAdapter', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('getLatestPrice', () => {
        it('should return valid data', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockImplementation(async () => {
                return validRedstoneData;
            });
            const redstoneAdapter = new RedstoneAdapter();
            const data = await redstoneAdapter.getLatestPrice();
            expect(data.price).toEqual(500000000000n);
            expect(data.decimals).toEqual(8);
            expect(data.signature).toEqual('mockedSignature');
        });

        it('should throw an error when the SDK fails', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockRejectedValue(new Error('mocked error'));
            const redstoneAdapter = new RedstoneAdapter();

            await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Failed to get data from Redstone');
        });

        it('should throw an error when the returned data is empty', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockImplementation(async () => {
                return { ETH: undefined };
            });
            const redstoneAdapter = new RedstoneAdapter();

            await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Redstone returned empty data');
        });

        it('should throw an error when the returned data for the price feed is an empty array', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockImplementation(async () => {
                return { ETH: [] };
            });
            const redstoneAdapter = new RedstoneAdapter();

            await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Redstone returned empty data');
        });

        it('should throw an error when the returned data does not contain any data points', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockImplementation(async () => {
                const updatedData = JSON.parse(JSON.stringify(validRedstoneData));
                updatedData.ETH[0].dataPackage.dataPoints = [];
                return updatedData;
            });
            const redstoneAdapter = new RedstoneAdapter();

            await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Not enough data points from Redstone');
        });
    });

    describe('getPriceAtTimestamp', () => {
        it('should return valid data', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            const mockedFn = vi.fn().mockImplementation(async () => {
                return validRedstoneData;
            });
            vi.mocked(mockedSdk).requestDataPackages = mockedFn;

            const redstoneAdapter = new RedstoneAdapter();
            const data = await redstoneAdapter.getPriceAtTimestamp(42);
            expect(data.price).toEqual(500000000000n);
            expect(data.decimals).toEqual(8);
            expect(data.signature).toEqual('mockedSignature');

            expect(mockedFn).toHaveBeenCalledOnce();
            expect(mockedFn.mock.calls[0][0].historicalTimestamp).to.equal(42);
        });
    });

    describe('subscribeToPriceUpdates', () => {
        beforeEach(async () => {
            const mockedUtils = await import('../../../utils/index.ts');
            vi.mocked(mockedUtils).sleep = vi.fn();
        });

        it('should execute the callback on price update', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockImplementation(async () => {
                // stop the polling after the first iteration
                process.emit('SIGINT');
                return validRedstoneData;
            });

            const redstoneAdapter = new RedstoneAdapter();
            const callback = vi.fn();
            await redstoneAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledOnce();
        });

        it('should execute the callback only once if the price signature did not change', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi
                .fn()
                .mockImplementationOnce(async () => {
                    return validRedstoneData;
                })
                .mockImplementationOnce(async () => {
                    // stop the polling after the second iteration
                    process.emit('SIGINT');

                    const updatedData = JSON.parse(JSON.stringify(validRedstoneData));
                    updatedData.ETH[0].signature = 'something else';
                    return updatedData;
                });

            const redstoneAdapter = new RedstoneAdapter();
            const callback = vi.fn();
            await redstoneAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledTimes(2);
        });

        it('should execute the callback twice if the price signature changed', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi
                .fn()
                .mockImplementationOnce(async () => {
                    return validRedstoneData;
                })
                .mockImplementationOnce(async () => {
                    // stop the polling after the second iteration
                    process.emit('SIGINT');
                    return validRedstoneData;
                });

            const redstoneAdapter = new RedstoneAdapter();
            const callback = vi.fn();
            await redstoneAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledOnce();
        });

        it('should not execute the callback and not throw an error if the price fetching fails', async () => {
            const mockedSdk = await import('@redstone-finance/sdk');
            vi.mocked(mockedSdk).requestDataPackages = vi.fn().mockImplementation(async () => {
                // stop the polling after the first iteration
                process.emit('SIGTERM');
                throw new Error();
            });

            const redstoneAdapter = new RedstoneAdapter();
            const callback = vi.fn();
            await redstoneAdapter.subscribeToPriceUpdates(callback);
            expect(callback).toHaveBeenCalledTimes(0);
        });
    });
});
