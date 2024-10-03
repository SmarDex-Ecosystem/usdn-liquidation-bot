import { type Hex, isAddress, type PublicClient } from 'viem';
import chainlinkPriceFeedABI from './abi.ts';
import type { RoundData } from './types.ts';

export default class ChainlinkPriceFeedContract {
    /** Client to use to communicate with the smart contract */
    private blockchainClient: PublicClient;
    /** Address for the ETH/USD price feed */
    private priceFeedAddress: Hex;

    constructor(blockchainClient: PublicClient) {
        this.blockchainClient = blockchainClient;

        const priceFeedAddress = process.env.CHAINLINK_USD_ETH_FEED;
        if (!priceFeedAddress || !isAddress(priceFeedAddress)) {
            throw new Error('CHAINLINK_USD_ETH_FEED env variable is not a valid address');
        }

        this.priceFeedAddress = priceFeedAddress;
    }

    /**
     * Get the previous round ID. As round IDs are not guaranteed to be sequential, we need to do a few checks before we can return a valid value.
     * @param roundId The current round ID
     * @returns The previous round ID
     */
    private async getPreviousRoundId(roundId: bigint) {
        const phaseId = roundId >> 64n;
        // check if the previous round ID is valid under the current phase
        if ((roundId - 1n) >> 64n === phaseId && roundId - 1n !== phaseId << 64n) {
            // if yes, then the round IDs are consecutive, so simply subtract 1
            return roundId - 1n;
        }

        const previousAggregatorAddress = await this.blockchainClient.readContract({
            address: this.priceFeedAddress,
            abi: chainlinkPriceFeedABI,
            functionName: 'phaseAggregators',
            // phaseId is a uint16 so it is between 0 and Number.MAX_SAFE_INTEGER
            args: [Number(phaseId - 1n)],
        });

        const latestRoundId = await this.blockchainClient.readContract({
            address: previousAggregatorAddress,
            abi: chainlinkPriceFeedABI,
            functionName: 'latestRound',
        });

        return ((phaseId - 1n) << 64n) + latestRoundId;
    }

    /**
     * Extract the price data from the contract's output
     * @param contractOutput An array of values containing the data of the round
     * @returns The price data for the round
     */
    private extractPriceFeedData(contractOutput: readonly [bigint, bigint, bigint, bigint, bigint]) {
        const [roundId, price, , timestamp] = contractOutput;

        return {
            price,
            decimals: 8,
            roundId,
            timestamp,
        } as RoundData;
    }

    /**
     * Get the latest round's data
     * @returns The latest round's data
     */
    async getLatestRoundData() {
        return this.blockchainClient
            .readContract({
                address: this.priceFeedAddress,
                abi: chainlinkPriceFeedABI,
                functionName: 'latestRoundData',
            })
            .then(this.extractPriceFeedData);
    }

    /**
     * Return the data of the closest round after to the provided timestamp
     * @param timestamp The timestamp the round needs to exceed
     * @returns The closes round after the timestamp
     */
    async getRoundDataAfterTimestamp(timestamp: number) {
        let lastRound = await this.getLatestRoundData();

        // If latest round is below the provided timestamp, no round is recent enough
        if (lastRound.timestamp < timestamp) {
            return null;
        }

        let previousRound = lastRound;
        while (lastRound.timestamp > timestamp) {
            previousRound = lastRound;
            const roundData = await this.blockchainClient.readContract({
                address: this.priceFeedAddress,
                abi: chainlinkPriceFeedABI,
                functionName: 'getRoundData',
                args: [await this.getPreviousRoundId(lastRound.roundId)],
            });

            lastRound = this.extractPriceFeedData(roundData);
        }

        return previousRound;
    }
}
