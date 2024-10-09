import { HermesClient, type PriceUpdate } from '@pythnetwork/hermes-client';
import { ALowLatencyOracle } from '../AOracleAdapter.ts';
import { type OraclePriceData, OraclePriceFetchingError, type OraclePriceUpdateCallback } from '../types.ts';
import type { Hex } from 'viem';

/** Adapter to get price data from the Pyth oracle */
export default class PythAdapter extends ALowLatencyOracle {
    /** ID of the price feed of ETH/USD in the Pyth oracle */
    private readonly PRICE_FEED_ID = '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
    /** Instance of the client to get data from Pyth */
    private connection;
    /** @inheritdoc */
    public readonly VALIDATION_COST = 1n;

    constructor() {
        super();
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
            signature: `0x${priceUpdates.binary.data[0]}` as Hex,
        };
    }

    /**
     * Get the most recent data for the PRICE_FEED_ID
     * @returns The price data
     */
    private async getFeedPriceUpdate(timestamp = 0): Promise<PriceUpdate> {
        let priceUpdates: PriceUpdate;
        const options = {
            parsed: true,
            encoding: 'hex' as const,
        };
        try {
            if (timestamp === 0) {
                priceUpdates = await this.connection.getLatestPriceUpdates([this.PRICE_FEED_ID], options);
            } else {
                priceUpdates = await this.connection.getPriceUpdatesAtTimestamp(
                    timestamp,
                    [this.PRICE_FEED_ID],
                    options,
                );
            }
        } catch (error) {
            throw new OraclePriceFetchingError('Failed to get data from Pyth');
        }

        return priceUpdates;
    }

    /** @inheritdoc */
    async getLatestPrice() {
        const priceUpdate = await this.getFeedPriceUpdate();

        return this.extractDataFromPriceUpdate(priceUpdate);
    }

    /** @inheritdoc */
    async getPriceAtTimestamp(timestamp: number) {
        const priceUpdate = await this.getFeedPriceUpdate(timestamp);

        return this.extractDataFromPriceUpdate(priceUpdate);
    }

    /** @inheritdoc */
    async subscribeToPriceUpdates(callback: OraclePriceUpdateCallback) {
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
                console.error(`Failed to parse Pyth price update: ${(e as Error).message}`);
                return;
            }
            callback(oraclePriceData);
        };
        this.prepareGracefulShutdown(eventSource);
    }
}
