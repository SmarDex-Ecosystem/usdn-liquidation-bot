import { HermesClient, type PriceUpdate } from '@pythnetwork/hermes-client';
import type IOracleAdapter from '../IOracleAdapter.ts';
import { type OraclePriceData, OraclePriceFetchingError, type OraclePriceUpdateCallback } from '../types.ts';

export default class PythAdapter implements IOracleAdapter {
    /** ID of the price feed of ETH/USD in the Pyth oracle */
    private readonly PRICE_FEED_ID = '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
    /** Instance of the client to get data from Pyth */
    private connection;

    constructor() {
        const hermesUrl = process.env.HERMES_URL;
        if (hermesUrl === undefined || hermesUrl === '') {
            throw new Error('Environment variable HERMES_URL not set');
        }

        this.connection = new HermesClient(hermesUrl, {});
    }

    /** Make sure we close all of the open connections before terminating the process */
    private prepareGracefulShutdown(eventSource: EventSource) {
        const closeConnection = (signalReceived: string) => {
            console.info(`${signalReceived}: Closing Pyth oracle websocket`);
            eventSource.close();
            console.info('Pyth oracle websocket closed');
        };

        process.on('SIGTERM', () => {
            closeConnection('SIGTERM');
        });
        process.on('SIGINT', () => {
            closeConnection('SIGINT');
        });
    }

    /** Extract the oracle price data from the Pyth price update */
    private extractDataFromPriceUpdate(priceUpdates: PriceUpdate) {
        if (priceUpdates.parsed === undefined || priceUpdates.parsed === null || priceUpdates.parsed.length === 0) {
            throw new OraclePriceFetchingError('Pyth returned empty data');
        }

        if (priceUpdates.binary.data.length === 0) {
            throw new OraclePriceFetchingError('Pyth did not return a signature for their price');
        }

        const { price: pythPrice, expo } = priceUpdates.parsed[0].price;

        return {
            price: BigInt(pythPrice),
            decimals: expo * -1,
            signature: priceUpdates.binary.data[0],
        };
    }

    /**
     * Get the most recent data for the PRICE_FEED_ID
     * @returns The price data
     */
    private async getFeedPriceUpdate(): Promise<PriceUpdate> {
        let priceUpdates: PriceUpdate;
        try {
            priceUpdates = await this.connection.getLatestPriceUpdates([this.PRICE_FEED_ID], {
                parsed: true,
                encoding: 'hex',
            });
        } catch (error) {
            throw new Error('Failed to get data from Pyth');
        }

        return priceUpdates;
    }

    /** @inheritdoc */
    async getLatestPrice() {
        const priceUpdate = await this.getFeedPriceUpdate();

        return this.extractDataFromPriceUpdate(priceUpdate);
    }

    /** @inheritdoc */
    async subscribeToPriceUpdate(callback: OraclePriceUpdateCallback) {
        const eventSource = await this.connection.getPriceUpdatesStream([this.PRICE_FEED_ID], {
            parsed: true,
            encoding: 'hex',
        });
        eventSource.onmessage = (event: MessageEvent) => {
            const priceUpdate = JSON.parse(event.data);
            let oraclePriceData: OraclePriceData;
            try {
                oraclePriceData = this.extractDataFromPriceUpdate(priceUpdate);
            } catch (e) {
                return;
            }
            callback(oraclePriceData);
        };
        this.prepareGracefulShutdown(eventSource);
    }
}
