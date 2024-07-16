import { type PriceFeed, PriceServiceConnection } from '@pythnetwork/price-service-client';
import type IOracleAdapter from '../IOracleAdapter.js';
import { type OraclePriceData, OraclePriceFetchingError, type OraclePriceUpdateCallback } from '../types.js';
import type { PriceFeedUpdateCallback } from '@pythnetwork/price-service-client/lib/PriceServiceConnection.js';

export default class PythAdapter implements IOracleAdapter {
    /** ID of the price feed of ETH/USD in the Pyth oracle */
    private readonly PRICE_FEED_ID = '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
    /** API endpoint to hit to get price data */
    private readonly HERMES_URL = 'https://hermes.pyth.network';
    /** Instance of the client to get data from Pyth */
    private connection;

    constructor() {
        this.connection = new PriceServiceConnection(this.HERMES_URL, {
            priceFeedRequestConfig: {
                // includes the price signature for the price to be validated on-chain
                binary: true,
            },
        });
    }

    /** Make sure we close all of the open connections before terminating the process */
    private prepareGracefulShutdown() {
        const closeConnection = (signalReceived: string) => {
            console.info(`${signalReceived}: Closing Pyth oracle websocket`);
            this.connection.closeWebSocket();
            console.info('Pyth oracle websocket closed');
        };

        process.on('SIGTERM', () => {
            closeConnection('SIGTERM');
        });
        process.on('SIGINT', () => {
            closeConnection('SIGINT');
        });
    }

    /** Extract the oracle price data from the Pyth price feed */
    private extractDataFromPriceFeed(priceFeed: PriceFeed) {
        // 45 seconds is the limit from which a price will be considered too old
        // but we take 30 seconds to take into account block time, to be safe
        const pythPrice = priceFeed.getPriceNoOlderThan(30);
        if (pythPrice === undefined) {
            throw new OraclePriceFetchingError('No recent price available from Pyth');
        }

        // if the signature is not present, we cannot use it on-chain
        if (priceFeed.vaa === undefined) {
            throw new OraclePriceFetchingError('Pyth did not return a signature for their price');
        }

        return {
            price: BigInt(pythPrice.price),
            decimals: pythPrice?.expo * -1,
            signature: priceFeed.vaa,
        };
    }

    /**
     * Get the most recent data for the PRICE_FEED_ID
     * @returns The price feed data
     */
    private async getEthPriceFeed() {
        let priceFeeds: PriceFeed[] | undefined;
        try {
            priceFeeds = await this.connection.getLatestPriceFeeds([this.PRICE_FEED_ID]);
        } catch (error) {
            throw new Error('Failed to get data from Pyth');
        }

        if (priceFeeds === undefined || priceFeeds.length === 0) {
            throw new OraclePriceFetchingError('Pyth returned empty data');
        }

        return priceFeeds[0];
    }

    /** @inheritdoc */
    async getLatestPrice() {
        const priceFeed = await this.getEthPriceFeed();

        return this.extractDataFromPriceFeed(priceFeed);
    }

    /** @inheritdoc */
    async subscribeToPriceUpdate(callback: OraclePriceUpdateCallback) {
        const pythCallback: PriceFeedUpdateCallback = (priceFeed: PriceFeed) => {
            let oraclePriceData: OraclePriceData;
            try {
                oraclePriceData = this.extractDataFromPriceFeed(priceFeed);
            } catch (e) {
                return;
            }
            callback(oraclePriceData);
        };

        await this.connection.subscribePriceFeedUpdates([this.PRICE_FEED_ID], pythCallback);
        this.prepareGracefulShutdown();
    }
}
