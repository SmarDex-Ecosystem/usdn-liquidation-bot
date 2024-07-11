import { afterEach, describe, expect, it, vi } from 'vitest';
import RedstoneAdapter from './RedstoneAdapter.js';

vi.mock('@redstone-finance/sdk', async (originalImport) => {
    const redstoneSdk = await originalImport<typeof import('@redstone-finance/sdk')>()
    return {
        ...redstoneSdk,
        // replace used functions
        requestDataPackages: vi.fn(),
    }
});

const validRedstoneData = {
    ETH: [{
        dataPackage: {
            dataPoints: [{value: [
                0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0,
                116, 106, 82, 136, 0 // 500000000000n
            ]}]
        },
        signature: {
            compact: 'mockedSignature'
        }}
    ]
}

describe('RedstoneAdapter', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('should return valid data', async () => {
        const mockedSdk = await import('@redstone-finance/sdk');
        vi.mocked(mockedSdk).requestDataPackages =
            vi.fn().mockImplementation(async () => {
                return validRedstoneData
            });
        const redstoneAdapter = new RedstoneAdapter();
        const data = await redstoneAdapter.getLatestPrice();
        expect(data.price).toEqual(500000000000n);
        expect(data.decimals).toEqual(8);
        expect(data.signature).toEqual('mockedSignature');
    });

    it('should throw an error when the SDK fails', async () => {
        const mockedSdk = await import('@redstone-finance/sdk');
        vi.mocked(mockedSdk).requestDataPackages =
            vi.fn().mockRejectedValue(new Error('mocked error'));
        const redstoneAdapter = new RedstoneAdapter();

        await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Failed to get data from Redstone');
    });

    it('should throw an error when the returned data is empty', async () => {
        const mockedSdk = await import('@redstone-finance/sdk');
        vi.mocked(mockedSdk).requestDataPackages =
            vi.fn().mockImplementation(async () => {
                return { ETH: undefined }
            });
        const redstoneAdapter = new RedstoneAdapter();

        await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Redstone returned empty data');
    });

    it('should throw an error when the returned data for the price feed is an empty array', async () => {
        const mockedSdk = await import('@redstone-finance/sdk');
        vi.mocked(mockedSdk).requestDataPackages =
            vi.fn().mockImplementation(async () => {
                return { ETH: [ ] }
            });
        const redstoneAdapter = new RedstoneAdapter();

        await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Redstone returned empty data');
    });

    it('should throw an error when the returned data does not contain any data points', async () => {
        const mockedSdk = await import('@redstone-finance/sdk');
        vi.mocked(mockedSdk).requestDataPackages =
            vi.fn().mockImplementation(async () => {
                validRedstoneData.ETH[0].dataPackage.dataPoints = [];
                return validRedstoneData;
            });
        const redstoneAdapter = new RedstoneAdapter();

        await expect(redstoneAdapter.getLatestPrice()).to.rejects.toThrow('Not enough data points from Redstone');
    });
});
