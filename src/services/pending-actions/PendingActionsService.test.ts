import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest';
import PendingActionsService from './PendingActionsService.ts';
import { getBlockchainClient } from '../../utils/index.ts';
import { type OnBlock, parseEther, zeroAddress } from 'viem';
import type { AHighLatencyOracle, ALowLatencyOracle } from '../../adapters/oracles/AOracleAdapter.ts';
import { OracleType } from '../../adapters/oracles/types.ts';
import OracleMiddlewareContract from '../../adapters/usdn-protocol/blockchain/OracleMiddlewareContract.ts';
import UsdnProtocolContract from '../../adapters/usdn-protocol/blockchain/UsdnProtocolContract.ts';

const blockchainClient = getBlockchainClient();
let newBlockCallback: OnBlock;
const lowLatencyOracle: ALowLatencyOracle = {
    TYPE: OracleType.LowLatency,
    VALIDATION_COST: 5n,
    subscribeToPriceUpdates: vi.fn(),
    getLatestPrice: vi.fn(),
    getPriceAtTimestamp: vi.fn(),
};
const highLatencyOracle: AHighLatencyOracle = {
    TYPE: OracleType.HighLatency,
    VALIDATION_COST: 0n,
    subscribeToPriceUpdates: vi.fn(),
    getLatestPrice: vi.fn(),
    getPriceAtTimestamp: vi.fn(),
};

const usdnProtocolContract = new UsdnProtocolContract(zeroAddress, blockchainClient);
let getActionablePendingActionsSpy = vi
    .spyOn(usdnProtocolContract, 'getActionablePendingActions')
    .mockImplementation(vi.fn());
const validateActionablePendingActionsSpy = vi
    .spyOn(usdnProtocolContract, 'validateActionablePendingActions')
    .mockResolvedValue({ hash: '0x0', validatedActionsAmount: 0n });

const oracleMiddlewareContract = new OracleMiddlewareContract(zeroAddress, blockchainClient);
vi.spyOn(oracleMiddlewareContract, 'getLowLatencyDelay').mockResolvedValue(20 * 60);
vi.spyOn(oracleMiddlewareContract, 'getValidationDelay').mockResolvedValue(24);
const pendingActionsService = new PendingActionsService(
    usdnProtocolContract,
    oracleMiddlewareContract,
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
    });

    describe('watchActionablePendingActions', () => {
        it('should not do anything if there are no actionable pending actions', async () => {
            await pendingActionsService.watchActionablePendingActions();
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
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 4, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60) - 1, // high latency oracle
                            to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                    ],
                        rawIndices,
                    });

                await pendingActionsService.watchActionablePendingActions();
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
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 2, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60), // low latency oracle
                            to: '0x0000000000000000000000000000000000000001', validator: '0x0000000000000000000000000000000000000002',
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 4, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60) - 1, // high latency oracle
                            to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                    ],
                        rawIndices,
                    });

                await pendingActionsService.watchActionablePendingActions();
                await newBlockCallback({ timestamp: BigInt(now) } as any, {} as any);
                expect(highLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(lowLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledTimes(2);
                expect(validateActionablePendingActionsSpy).toHaveBeenCalledOnce();
                // the first raw index should have been removed from the array
                expect(validateActionablePendingActionsSpy.mock.lastCall?.[1]).toEqual(rawIndices.slice(1));
                expect(validateActionablePendingActionsSpy.mock.lastCall?.[2]).toEqual(
                    lowLatencyOracle.VALIDATION_COST * 2n,
                );
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
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                        {
                            action: 4, securityDepositValue: parseEther('1'), timestamp: now + blockTime - (20 * 60) - 1, // high latency oracle
                            to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                            var0: 0, var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                        },
                    ],
                        rawIndices,
                    });

                await pendingActionsService.watchActionablePendingActions();
                await newBlockCallback({ timestamp: BigInt(now) } as any, {} as any);
                expect(highLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(lowLatencyOracle.getPriceAtTimestamp).toHaveBeenCalledOnce();
                expect(validateActionablePendingActionsSpy).toHaveBeenCalledTimes(0);
            });
        });
    });
});
