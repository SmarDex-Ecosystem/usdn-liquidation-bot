import { encodeAbiParameters } from 'viem';
import { sleep } from '../../../utils/index.ts';
import { HighLatencyOracle } from '../OracleAdapter.ts';
import { type OraclePriceData, OraclePriceFetchingError, type OraclePriceUpdateCallback } from '../types.js';
import type ChainlinkPriceFeedContract from './blockchain/ChainlinkPriceFeedContract.ts';
import type { RoundData } from './blockchain/types.ts';

/** Adapter to get price data from the Chainlink's on-chain oracle */
export default class ChainlinkAdapter extends HighLatencyOracle {
    private contract: ChainlinkPriceFeedContract;
    /** @inheritdoc */
    public readonly VALIDATION_COST = 0n;

    /**
     * @param contract A client to communicate with the Chainlink's price feed's contract
     */
    constructor(contract: ChainlinkPriceFeedContract) {
        super();
        this.contract = contract;
    }

    /**
     * Create a signature with the round data
     * @param roundData The round data for the signature
     * @returns The signature for the provided data
     */
    private getSignature(roundData: RoundData) {
        // should be equal to abi.encode(uint80(roundId))
        return encodeAbiParameters([{ name: 'roundId', type: 'uint80' }], [roundData.roundId]);
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
            signature: this.getSignature(roundData),
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
            signature: this.getSignature(roundData),
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
            } catch (error) {
                console.error(`Failed to parse Chainlink price data: ${error}`);
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
