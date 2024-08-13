import { encodeAbiParameters } from 'viem';
import { sleep } from '../../../utils/index.ts';
import type IOracleAdapter from '../IOracleAdapter.js';
import { type OraclePriceData, OraclePriceFetchingError, type OraclePriceUpdateCallback } from '../types.js';
import type ChainlinkPriceFeedContract from './blockchain/ChainlinkPriceFeedContract.ts';
import type { RoundData } from './blockchain/types.ts';

export default class ChainlinkAdapter implements IOracleAdapter {
    private contract;

    constructor(contract: ChainlinkPriceFeedContract) {
        this.contract = contract;
    }

    /** @inheritdoc */
    async getLatestPrice(): Promise<OraclePriceData> {
        let roundData: RoundData;
        try {
            roundData = await this.contract.getLatestRoundData();
        } catch (error) {
            throw new OraclePriceFetchingError('Failed to get data from Chainlink');
        }

        return {
            price: roundData.price,
            decimals: roundData.decimals,
            // should be equal to abi.encode(uint80(roundId))
            signature: encodeAbiParameters([{ name: 'roundId', type: 'uint80' }], [roundData.roundId]),
        };
    }

    /** @inheritdoc */
    async getPriceAtTimestamp(timestamp: number): Promise<OraclePriceData> {
        let roundData: RoundData | null;
        try {
            roundData = await this.contract.getRoundDataAfterTimestamp(timestamp);
        } catch (error) {
            throw new OraclePriceFetchingError('Failed to get data from Chainlink');
        }

        if (roundData === null) {
            throw new OraclePriceFetchingError('No price found for this timestamp');
        }

        return {
            price: roundData.price,
            decimals: roundData.decimals,
            // should be equal to abi.encode(uint80(roundId))
            signature: encodeAbiParameters([{ name: 'roundId', type: 'uint80' }], [roundData.roundId]),
        };
    }

    /** @inheritdoc */
    async subscribeToPriceUpdates(callback: OraclePriceUpdateCallback) {
        let isPolling = true;

        // Stop polling if process is getting stopped
        const closeConnection = (signalReceived: string) => {
            console.info(`${signalReceived}: Stopping Chainlink polling`);
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
                console.error(`Failed to parse Chainlink price data: ${(e as Error).message}`);
                await sleep(10000);
                continue;
            }

            // Check if the signature changed which would mean it's a new price
            if (priceData.signature !== lastPriceSignature) {
                callback(priceData);
                lastPriceSignature = priceData.signature;
            }

            // Wait 10 second before continuing
            await sleep(10000);
        }
        console.info('Chainlink polling stopped');
    }
}
