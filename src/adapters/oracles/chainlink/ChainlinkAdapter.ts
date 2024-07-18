import type IOracleAdapter from '../IOracleAdapter.js';
import type { OraclePriceData, OraclePriceUpdateCallback } from '../types.js';
import { Chainlink } from 'dev3-sdk';
import { encodeAbiParameters } from 'viem';

export default class ChainlinkAdapter implements IOracleAdapter {
    private ethSDK;

    constructor() {
        const rpcUrl = process.env.RPC_URL;
        if (rpcUrl === undefined || rpcUrl === '') {
            throw new Error('RPC URL not set');
        }

        this.ethSDK = Chainlink.instance(rpcUrl, Chainlink.PriceFeeds.ETH);
    }

    /** @inheritdoc */
    async getLatestPrice(): Promise<OraclePriceData> {
        let priceData: {
            // biome-ignore lint/complexity/noBannedTypes: Chainlink's SDK still uses it
            answer: BigInt;
            // biome-ignore lint/complexity/noBannedTypes: Chainlink's SDK still uses it
            roundID: BigInt;
        };
        try {
            priceData = await this.ethSDK.getFromOracle(this.ethSDK.feeds.ETH_USD);
        } catch (error) {
            throw new Error('Failed to get data from Chainlink');
        }

        return {
            price: BigInt(priceData.answer.toString()),
            decimals: 18,
            // should be equal to abi.encode(uint80(roundId))
            signature: encodeAbiParameters(
                [{ name: 'roundId', type: 'uint80' }],
                [BigInt(priceData.roundID.toString())],
            ),
        };
    }

    /** @inheritdoc */
    async subscribeToPriceUpdate(_callback: OraclePriceUpdateCallback) {
        throw new Error('Price subscription is not supported for Chainlink');
    }
}
