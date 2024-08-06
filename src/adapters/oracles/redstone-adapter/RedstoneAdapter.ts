import { type DataPackagesResponse, requestDataPackages } from '@redstone-finance/sdk';
import type IOracleAdapter from '../IOracleAdapter.ts';
import { type OraclePriceData, OraclePriceFetchingError, type OraclePriceUpdateCallback } from '../types.ts';
import { sleep } from '../../../utils/index.ts';

export default class RedstoneAdapter implements IOracleAdapter {
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
    private async getETHPriceFeedData(timestamp = 0) {
        let data: DataPackagesResponse;
        try {
            data = await requestDataPackages({
                dataFeeds: [this.PRICE_FEED_ID],
                dataServiceId: 'redstone-primary-prod',
                uniqueSignersCount: this.MIN_UNIQUE_SIGNERS_COUNT,
                historicalTimestamp: timestamp === 0 ? undefined : timestamp,
            });
        } catch (error) {
            throw new Error('Failed to get data from Redstone');
        }

        if (data?.ETH === undefined || data.ETH.length === 0) {
            throw new OraclePriceFetchingError('Redstone returned empty data');
        }

        return data.ETH[0];
    }

    /** @inheritDoc */
    async getLatestPrice() {
        const data = await this.getETHPriceFeedData();
        if (data.dataPackage.dataPoints.length === 0) {
            throw new OraclePriceFetchingError('Not enough data points from Redstone');
        }

        const price = this.uint8ArrayToBigInt(data.dataPackage.dataPoints[0].value);
        const signature = data.signature.compact;

        return {
            price,
            decimals: this.PRICE_DECIMALS,
            signature,
        };
    }

    /** @inheritDoc */
    async getPriceAtTimestamp(timestamp: number) {
        const data = await this.getETHPriceFeedData(timestamp);
        if (data.dataPackage.dataPoints.length === 0) {
            throw new OraclePriceFetchingError('Not enough data points from Redstone');
        }

        const price = this.uint8ArrayToBigInt(data.dataPackage.dataPoints[0].value);
        const signature = data.signature.compact;

        return {
            price,
            decimals: this.PRICE_DECIMALS,
            signature,
        };
    }

    /** @inheritdoc */
    async subscribeToPriceUpdates(callback: OraclePriceUpdateCallback) {
        let isPolling = true;

        // Stop polling if process is getting stopped
        const closeConnection = (signalReceived: string) => {
            console.info(`${signalReceived}: Stopping Redstone polling`);
            isPolling = false;
        };

        process.on('SIGTERM', () => {
            closeConnection('SIGTERM');
        });
        process.on('SIGINT', () => {
            closeConnection('SIGINT');
        });

        let lastPriceSignature = '';
        while (isPolling) {
            let priceData: OraclePriceData;
            try {
                priceData = await this.getLatestPrice();
            } catch (e) {
                console.error(`Failed to parse Redstone price data: ${(e as Error).message}`);
                await sleep(1000);
                continue;
            }

            // Check if the signature changed which would mean it's a new price
            if (priceData.signature !== lastPriceSignature) {
                callback(priceData);
                lastPriceSignature = priceData.signature;
            }

            // Wait 1 second before continuing
            await sleep(1000);
        }
        console.info('Redstone polling stopped');
    }
}
