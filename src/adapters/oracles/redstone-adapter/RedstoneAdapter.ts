import { type DataPackagesResponse, requestDataPackages } from '@redstone-finance/sdk';
import type IRedstoneAdapter from './IRedstoneAdapter.js';
import { RedstonePriceFetchingError } from './types.js';

export default class RedstoneAdapter implements IRedstoneAdapter {
    private readonly PRICE_DECIMALS = 8;
    private readonly MIN_UNIQUE_SIGNERS_COUNT = 3;
    private readonly PRICE_FEED_ID = 'ETH';

    /**
     * Convert an array of uint8 to a bigint
     * @param uint8Array The array to extract the bigint from
     * @returns The bigint corresponding to the array of uint8
     */
    private uint8ArrayToBigInt(uint8Array: Uint8Array) {
        let bigInt = 0n;
        for (const byte of uint8Array) {
            bigInt = (bigInt << 8n) + BigInt(byte);
        }
        return bigInt;
    }

    /**
     * Get the latest data of the ETH price feed from Redstone
     * @returns The ETH price feed data
     */
    private async getETHPriceFeedData() {
        let data: DataPackagesResponse;
        try {
            data = await requestDataPackages({
                dataFeeds: [this.PRICE_FEED_ID],
                dataServiceId: 'redstone-primary-prod',
                uniqueSignersCount: this.MIN_UNIQUE_SIGNERS_COUNT,
            });
        } catch (error) {
            throw new Error('Failed to get data from Redstone');
        }

        if (data?.ETH === undefined || data.ETH.length === 0) {
            throw new RedstonePriceFetchingError('Redstone returned empty data');
        }

        return data.ETH[0];
    }

    /** @inheritDoc */
    async getLatestPrice() {
        const data = await this.getETHPriceFeedData();
        if (data.dataPackage.dataPoints.length === 0) {
            throw new RedstonePriceFetchingError('Not enough data points from Redstone');
        }

        const price = this.uint8ArrayToBigInt(data.dataPackage.dataPoints[0].value);
        const signature = data.signature.compact;

        return {
            price,
            decimals: this.PRICE_DECIMALS,
            signature,
        };
    }
}
