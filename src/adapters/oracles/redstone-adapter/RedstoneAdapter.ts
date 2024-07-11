import { SignedDataPackage } from "@redstone-finance/protocol";
import { DataPackagesResponse, requestDataPackages } from "@redstone-finance/sdk";
import IRedstoneAdapter from "./IRedstoneAdapter.js";
import { RedstonePrice, RedstonePriceFetchingError } from "./types.js";

export default class RedstoneAdapter implements IRedstoneAdapter {
    private PRICE_DECIMALS = 8;
    private MIN_UNIQUE_SIGNERS_COUNT = 3;
    private PRICE_FEED_ID = 'ETH';

    private uint8ArrayToBigInt(uint8Array: Uint8Array) {
        let bigInt = 0n;
        for (const byte of uint8Array) {
            bigInt = (bigInt << 8n) + BigInt(byte);
        }
        return bigInt;
    }

    private async getOracleData(): Promise<SignedDataPackage> {
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

    async getLatestPrice(): Promise<RedstonePrice> {
        const data = await this.getOracleData();
        if (data.dataPackage.dataPoints.length === 0) {
            throw new RedstonePriceFetchingError('Not enough data points from Redstone');
        }

        const price = this.uint8ArrayToBigInt(data.dataPackage.dataPoints[0].value);
        const signature = data.signature.compact;
        
        return {
            price,
            decimals: this.PRICE_DECIMALS,
            signature
        };
    }
}