import type { PublicClient } from 'viem';
import chainlinkPriceFeedABI from './abi.ts';
import type { RoundData } from './types.ts';

export default class ChainlinkPriceFeedContract {
    /** Client to use to communicate with the smart contract */
    private blockchainClient: PublicClient;
    /** Address for the ETH/USD price feed */
    private priceFeedAddress: `0x${string}` = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';

    constructor(blockchainClient: PublicClient) {
        this.blockchainClient = blockchainClient;
    }

    private extractPriceFeedData(contractOutput: readonly [bigint, bigint, bigint, bigint, bigint]) {
        const [roundId, price, , timestamp] = contractOutput;

        return {
            price,
            decimals: 8,
            roundId,
            timestamp,
        } as RoundData;
    }

    async getLatestRoundData() {
        return this.blockchainClient
            .readContract({
                address: this.priceFeedAddress,
                abi: chainlinkPriceFeedABI,
                functionName: 'latestRoundData',
            })
            .then(this.extractPriceFeedData);
    }

    async getRoundDataAfterTimestamp(timestamp: number): Promise<RoundData | null> {
        let lastRound = await this.getLatestRoundData();
        let previousRound = lastRound;

        // If latest round is below the provided timestamp, no round is recent enough
        if (lastRound.timestamp < timestamp) {
            return null;
        }

        while (lastRound.timestamp > timestamp) {
            previousRound = lastRound;
            const roundData = await this.blockchainClient.readContract({
                address: this.priceFeedAddress,
                abi: chainlinkPriceFeedABI,
                functionName: 'getRoundData',
                args: [lastRound.roundId - 1n],
            });

            lastRound = this.extractPriceFeedData(roundData);
        }

        return previousRound;
    }
}
