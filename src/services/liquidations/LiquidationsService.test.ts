import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LiquidationsService from './LiquidationsService.ts';
import { liquidationPriceHistory } from '../liquidation-price-history/index.ts';
import { zeroAddress, type OnBlockNumberFn } from 'viem';
import { mainnet } from 'viem/chains';
import { getBlockchainClient, getBlockTime } from '../../utils/index.ts';
import UsdnProtocolContract from '../../adapters/usdn-protocol/blockchain/UsdnProtocolContract.ts';

const blockchainClient = getBlockchainClient();
let liquidationsService: LiquidationsService;
let onBlockNumber: OnBlockNumberFn;
let unwatchSpy = vi.fn();

vi.useFakeTimers();
const watchNewPricesSpy = vi.spyOn(liquidationPriceHistory, 'watchNewPrices').mockImplementation(vi.fn());
const getSmallestPriceRecordSpy = vi
    .spyOn(liquidationPriceHistory, 'getSmallestPriceRecord')
    .mockImplementation(vi.fn());

const usdnProtocolContract = new UsdnProtocolContract(zeroAddress, blockchainClient);
const liquidateSpy = vi
    .spyOn(usdnProtocolContract, 'liquidate')
    .mockResolvedValue({ hash: undefined, liquidatedTicksAmount: 0 });

vi.mock(import('../../utils/index.ts'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getBotEthBalance: vi.fn().mockResolvedValue(1119000000000000000000n),
    };
});

describe('LiquidationPriceHistory', () => {
    beforeEach(() => {
        unwatchSpy = vi.fn();
        liquidationsService = new LiquidationsService(usdnProtocolContract, blockchainClient, liquidationPriceHistory);
        vi.spyOn(blockchainClient, 'getChainId').mockResolvedValue(mainnet.id);
        vi.spyOn(blockchainClient, 'watchBlockNumber').mockImplementation((args) => {
            onBlockNumber = args.onBlockNumber;
            return unwatchSpy;
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('watchLiquidations', () => {
        it('should watch block numbers and early return if no prices were found', async () => {
            await liquidationsService.watchLiquidations();
            // service should have started watching new prices
            expect(watchNewPricesSpy).toHaveBeenCalledOnce();
            // trigger the new block callback
            onBlockNumber(1n, 0n);
            // we should not have tried to liquidate yet
            expect(liquidateSpy).toBeCalledTimes(0);
            // advance 80% of block time
            vi.advanceTimersByTime(getBlockTime(mainnet.id) * 800);
            // the liquidate function should not have been called as there are no price records available
            expect(getSmallestPriceRecordSpy).toBeCalledTimes(1);
            expect(liquidateSpy).toBeCalledTimes(0);
        });
        it('should watch block numbers and attempt to liquidate with a price', async () => {
            const signature = '0xPriceSignature';
            const oracleFee = 5n;
            getSmallestPriceRecordSpy.mockReturnValue({
                oracleFee,
                price: 42069n,
                signature,
                timestamp: 1720000000,
            });
            await liquidationsService.watchLiquidations();
            // service should have started watching new prices
            expect(watchNewPricesSpy).toHaveBeenCalledOnce();
            // trigger the new block callback
            onBlockNumber(1n, 0n);
            // we should not have tried to liquidate yet
            expect(liquidateSpy).toBeCalledTimes(0);
            // advance 80% of block time
            vi.advanceTimersByTime(getBlockTime(mainnet.id) * 800);
            // the liquidate function should have been called with the smallest price record to date
            expect(getSmallestPriceRecordSpy).toBeCalledTimes(1);
            expect(liquidateSpy).toBeCalledTimes(1);
            expect(liquidateSpy.mock.lastCall).toEqual([signature, oracleFee]);
        });
        it('gracefully shutdown on SIGINT', async () => {
            await liquidationsService.watchLiquidations();
            // trigger the new block callback
            onBlockNumber(1n, 0n);

            // emit a SIGINT signal to notify the service of a shutdown
            process.emit('SIGINT');
            expect(unwatchSpy).toHaveBeenCalledOnce();

            // advance 80% of block time
            vi.advanceTimersByTime(getBlockTime(mainnet.id) * 800);
            // the liquidate function should not have been called as timeout was cancelled
            expect(getSmallestPriceRecordSpy).toBeCalledTimes(0);
            expect(liquidateSpy).toBeCalledTimes(0);
        });
        it('gracefully shutdown on SIGTERM', async () => {
            await liquidationsService.watchLiquidations();
            // trigger the new block callback
            onBlockNumber(1n, 0n);

            // emit a SIGTERM signal to notify the service of a shutdown
            process.emit('SIGTERM');
            expect(unwatchSpy).toHaveBeenCalledOnce();

            // advance 80% of block time
            vi.advanceTimersByTime(getBlockTime(mainnet.id) * 800);
            // the liquidate function should not have been called as timeout was cancelled
            expect(getSmallestPriceRecordSpy).toBeCalledTimes(0);
            expect(liquidateSpy).toBeCalledTimes(0);
        });
    });
});
