import type { PublicClient } from 'viem';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ChainlinkPriceFeedContract from './ChainlinkPriceFeedContract.ts';

const mockedClient = {
    readContract: vi.fn(),
} as unknown as PublicClient;
// biome-ignore format: unnecessary
const validChainlinkData: [bigint, bigint, bigint, bigint, bigint] = [69420n, 3000n * 10n ** 8n, 0n, 42069n, 0n];

describe('ChainlinkPriceFeedContract', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('getLatestRoundData', () => {
        it('should return the data of the latest round', async () => {
            mockedClient.readContract = vi.fn().mockImplementation(async () => validChainlinkData);
            const chainlinkContract = new ChainlinkPriceFeedContract(mockedClient);

            const roundData = await chainlinkContract.getLatestRoundData();
            expect(roundData.roundId).to.equal(validChainlinkData[0]);
            expect(roundData.price).to.equal(validChainlinkData[1]);
            expect(roundData.decimals).to.equal(8);
            expect(roundData.timestamp).to.equal(validChainlinkData[3]);
        });
    });

    describe('getRoundDataAfterTimestamp', () => {
        it('should return the data of the closest round after the timestamp', async () => {
            const previousRoundData = [69419n, 2900n * 10n ** 8n, 0n, 42050n, 0n];
            const tooOldRoundData = [69418n, 2700n * 10n ** 8n, 0n, 42020n, 0n];
            const spy = vi
                .spyOn(mockedClient, 'readContract')
                .mockImplementationOnce(async () => validChainlinkData)
                .mockImplementationOnce(async () => previousRoundData)
                .mockImplementationOnce(async () => tooOldRoundData);
            const chainlinkContract = new ChainlinkPriceFeedContract(mockedClient);

            const roundData = await chainlinkContract.getRoundDataAfterTimestamp(Number(previousRoundData[3]) - 1);

            expect(roundData).to.not.be.null;
            if (roundData === null) return;

            expect(roundData.roundId).to.equal(previousRoundData[0]);
            expect(roundData.price).to.equal(previousRoundData[1]);
            expect(roundData.decimals).to.equal(8);
            expect(roundData.timestamp).to.equal(previousRoundData[3]);

            // The "too old" round data should have been reached but the "previous" is returned
            expect(spy).toHaveBeenCalledTimes(3);
        });
        it('should return null if the latest round is older than the provided timestamp', async () => {
            const spy = vi.spyOn(mockedClient, 'readContract').mockImplementation(async () => validChainlinkData);
            const chainlinkContract = new ChainlinkPriceFeedContract(mockedClient);

            const roundData = await chainlinkContract.getRoundDataAfterTimestamp(Number(validChainlinkData[3]) + 1);

            expect(roundData).to.be.null;
            expect(spy).toHaveBeenCalledOnce();
        });
        it('should return the right round if the round IDs are not consecutive', async () => {
            const phaseId = 2n;
            const previousPhaseId = phaseId - 1n;
            const latestRoundData = [phaseId >> 64n, 3000n * 10n ** 8n, 0n, 42069n, 0n];
            const previousRoundData = [(previousPhaseId >> 64n) + 2n, 3000n * 10n ** 8n, 0n, 42060n, 0n];
            const previousRoundData2 = [(previousPhaseId >> 64n) + 1n, 3000n * 10n ** 8n, 0n, 42050n, 0n];
            const getRoundData = vi
                .fn()
                .mockImplementationOnce(async () => latestRoundData)
                .mockImplementationOnce(async () => previousRoundData)
                .mockImplementationOnce(async () => previousRoundData2);
            const spy = vi.spyOn(mockedClient, 'readContract').mockImplementation(async (args) => {
                if (args.functionName === 'phaseAggregators') return '0x0000000000000000000000000000000000000001';
                if (args.functionName === 'latestRound') return previousRoundData;
                return getRoundData();
            });
            const chainlinkContract = new ChainlinkPriceFeedContract(mockedClient);

            const roundData = await chainlinkContract.getRoundDataAfterTimestamp(Number(previousRoundData[3]) - 1);

            expect(roundData).to.not.be.null;
            if (roundData === null) return;

            expect(roundData.roundId).to.equal(previousRoundData[0]);
            expect(roundData.price).to.equal(previousRoundData[1]);
            expect(roundData.decimals).to.equal(8);
            expect(roundData.timestamp).to.equal(previousRoundData[3]);

            expect(getRoundData).toHaveBeenCalledTimes(3);
            expect(spy).toHaveBeenCalledTimes(5);
        });
        it('should return the right round if the previous round ID is equal to the shifted phase ID', async () => {
            const phaseId = 2n;
            const previousPhaseId = phaseId - 1n;
            const latestRoundData = [(phaseId >> 64n) + 1n, 3000n * 10n ** 8n, 0n, 42069n, 0n];
            const previousRoundData = [(previousPhaseId >> 64n) + 2n, 3000n * 10n ** 8n, 0n, 42060n, 0n];
            const previousRoundData2 = [(previousPhaseId >> 64n) + 1n, 3000n * 10n ** 8n, 0n, 42050n, 0n];
            const getRoundData = vi
                .fn()
                .mockImplementationOnce(async () => latestRoundData)
                .mockImplementationOnce(async () => previousRoundData)
                .mockImplementationOnce(async () => previousRoundData2);
            const spy = vi.spyOn(mockedClient, 'readContract').mockImplementation(async (args) => {
                if (args.functionName === 'phaseAggregators') return '0x0000000000000000000000000000000000000001';
                if (args.functionName === 'latestRound') return previousRoundData;
                return getRoundData();
            });
            const chainlinkContract = new ChainlinkPriceFeedContract(mockedClient);

            const roundData = await chainlinkContract.getRoundDataAfterTimestamp(Number(previousRoundData[3]) - 1);

            expect(roundData).to.not.be.null;
            if (roundData === null) return;

            expect(roundData.roundId).to.equal(previousRoundData[0]);
            expect(roundData.price).to.equal(previousRoundData[1]);
            expect(roundData.decimals).to.equal(8);
            expect(roundData.timestamp).to.equal(previousRoundData[3]);

            expect(getRoundData).toHaveBeenCalledTimes(3);
            expect(spy).toHaveBeenCalledTimes(5);
        });
    });
});
