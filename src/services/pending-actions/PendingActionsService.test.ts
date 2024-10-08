import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest';
import type IOracleAdapter from '../../adapters/oracles/IOracleAdapter.ts';
import PendingActionsService from './PendingActionsService.ts';
import { usdnProtocolContract } from '../../adapters/usdn-protocol/index.ts';
import { getBlockchainClient } from '../../utils/index.ts';
import { type OnBlock, parseEther } from 'viem';

const blockchainClient = getBlockchainClient();
let newBlockCallback: OnBlock;
const lowLatencyOracle: IOracleAdapter = {
    subscribeToPriceUpdates: vi.fn(),
    getLatestPrice: vi.fn(),
    getPriceAtTimestamp: vi.fn(),
};
const highLatencyOracle: IOracleAdapter = {
    subscribeToPriceUpdates: vi.fn(),
    getLatestPrice: vi.fn(),
    getPriceAtTimestamp: vi.fn(),
};
let getActionablePendingActionsSpy = vi
    .spyOn(usdnProtocolContract, 'getActionablePendingActions')
    .mockImplementation(vi.fn());
const validateActionablePendingActionsSpy = vi
    .spyOn(usdnProtocolContract, 'validateActionablePendingActions')
    .mockImplementation(vi.fn());
const pendingActionsService = new PendingActionsService(
    usdnProtocolContract,
    blockchainClient,
    lowLatencyOracle,
    highLatencyOracle,
);

describe('PendingActionsService', () => {
    beforeEach(() => {
        vi.spyOn(blockchainClient, 'watchBlocks').mockImplementation((parameters) => {
            newBlockCallback = parameters.onBlock;

            return () => {};
        });
        lowLatencyOracle.getPriceAtTimestamp = vi.fn().mockResolvedValue({ signature: '0xSignatureLowLatency' });
        highLatencyOracle.getPriceAtTimestamp = vi.fn().mockResolvedValue({ signature: '0xSignatureHighLatency' });
    });
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('watchActionablePendingActions', () => {
        it('should not do anything if there are no actionable pending actions', async () => {
            pendingActionsService.watchActionablePendingActions();
            vi.spyOn(usdnProtocolContract, 'getActionablePendingActions').mockResolvedValue({
                pendingActions: [],
                rawIndices: [],
            });
            await newBlockCallback({} as any, {} as any);
            expect(validateActionablePendingActionsSpy).toHaveBeenCalledTimes(0);
            expect(lowLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledTimes(0);
            expect(highLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledTimes(0);
        });
        describe('should validate actionable pending actions', () => {
            // block timestamp do not include milliseconds
            const now = 1720000000 / 1000;
            const blockTime = 12;
            const rawIndices = [28n, 36n, 42n];
            beforeEach(() => {
                vi.useFakeTimers();
                vi.setSystemTime(now * 1000);
            });
            it('at every new block distributed among oracles', async () => {
                getActionablePendingActionsSpy = vi
                    .spyOn(usdnProtocolContract, 'getActionablePendingActions')
                    .mockResolvedValue({
                        // biome-ignore format: unnecessary
                        pendingActions: [
                        {
                            action: 2, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60), // low latency oracle
                            to: '0x0000000000000000000000000000000000000001', validator: '0x0000000000000000000000000000000000000002',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 4, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60) - 1, // high latency oracle
                            to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                    ],
                        rawIndices,
                    });

                pendingActionsService.watchActionablePendingActions();
                await newBlockCallback({ timestamp: BigInt(now) } as any, {} as any);
                expect(validateActionablePendingActionsSpy).toHaveBeenCalledOnce();
                expect(highLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(lowLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
            });
            it('and skip actions for which the price data fetching failed', async () => {
                lowLatencyOracle.getPriceAtTimestamp = vi
                    .fn()
                    .mockResolvedValue({ signature: '0xSignatureLowLatency' })
                    .mockRejectedValueOnce(new Error('Price fetching failed'));
                getActionablePendingActionsSpy = vi
                    .spyOn(usdnProtocolContract, 'getActionablePendingActions')
                    .mockResolvedValue({
                        // biome-ignore format: unnecessary
                        pendingActions: [
                        {
                            action: 2, securityDepositValue: parseEther('1'), timestamp: now + blockTime, // low latency oracle
                            to: '0x0000000000000000000000000000000000000001', validator: '0x0000000000000000000000000000000000000002',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 2, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60), // low latency oracle
                            to: '0x0000000000000000000000000000000000000001', validator: '0x0000000000000000000000000000000000000002',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 4, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60) - 1, // high latency oracle
                            to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                    ],
                        rawIndices,
                    });

                pendingActionsService.watchActionablePendingActions();
                await newBlockCallback({ timestamp: BigInt(now) } as any, {} as any);
                expect(highLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(lowLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledTimes(2);
                expect(validateActionablePendingActionsSpy).toHaveBeenCalledOnce();
                // the first raw index should have been removed from the array
                expect(validateActionablePendingActionsSpy.mock.lastCall?.[1]).toEqual(rawIndices.slice(1));
            });
            it('and early return if all price data fetching failed', async () => {
                lowLatencyOracle.getPriceAtTimestamp = vi.fn().mockRejectedValue(new Error('Price fetching failed'));
                highLatencyOracle.getPriceAtTimestamp = vi.fn().mockRejectedValue(new Error('Price fetching failed'));
                getActionablePendingActionsSpy = vi
                    .spyOn(usdnProtocolContract, 'getActionablePendingActions')
                    .mockResolvedValue({
                        // biome-ignore format: unnecessary
                        pendingActions: [
                        {
                            action: 2, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60), // low latency oracle
                            to: '0x0000000000000000000000000000000000000001', validator: '0x0000000000000000000000000000000000000002',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 4, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60) - 1, // high latency oracle
                            to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                            var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                    ],
                        rawIndices,
                    });

                pendingActionsService.watchActionablePendingActions();
                await newBlockCallback({ timestamp: BigInt(now) } as any, {} as any);
                expect(highLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(lowLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(validateActionablePendingActionsSpy).toHaveBeenCalledTimes(0);
            });
        });
    });
});
