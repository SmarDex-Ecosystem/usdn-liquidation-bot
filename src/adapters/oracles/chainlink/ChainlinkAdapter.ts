import { encodeAbiParameters } from 'viem';
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
    async subscribeToPriceUpdates(_callback: OraclePriceUpdateCallback) {
        throw new Error('Price subscription is not supported for Chainlink');
    }
}
