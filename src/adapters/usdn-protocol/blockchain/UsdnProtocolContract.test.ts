import { http, createPublicClient, createWalletClient, parseEther, zeroAddress } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsdnProtocolContract from './UsdnProtocolContract.ts';
import { anvil } from 'viem/chains';

type PendingAction = {
    action: number;
    timestamp: number;
    to: `0x${string}`;
    validator: `0x${string}`;
    securityDepositValue: bigint;
    var1: number;
    var2: bigint;
    var3: bigint;
    var4: bigint;
    var5: bigint;
    var6: bigint;
    var7: bigint;
};

// Mocking viem's clients
vi.mock('viem', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        PublicClient: vi.fn().mockImplementation(() => ({
            readContract: vi.fn(),
            multicall: vi.fn(),
        })),
        WalletClient: vi.fn().mockImplementation(() => ({
            simulateContract: vi.fn(),
        })),
    };
});

// Test setup
const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';
const mockPublicClient = createPublicClient({
    chain: anvil,
    transport: http(),
});
const mockWalletClient = createWalletClient({
    chain: anvil,
    transport: http(),
});
const mockSimulateContract = vi.spyOn(mockPublicClient, 'simulateContract');
const mockReadContract = vi.spyOn(mockPublicClient, 'readContract');
const mockMulticall = vi.spyOn(mockPublicClient, 'multicall');

describe('UsdnProtocolContract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should throw an error for an invalid Ethereum address', () => {
            const invalidAddress = '0xINVALID_ADDRESS';
            expect(() => new UsdnProtocolContract(invalidAddress, mockPublicClient, mockWalletClient)).toThrow(
                'Invalid Ethereum address for the USDN protocol',
            );
        });

        it('should not throw an error for a valid Ethereum address', () => {
            expect(
                () => new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient),
            ).not.toThrow();
        });
    });

    describe('getHighestPopulatedTick', () => {
        it('should return the highest populated tick', async () => {
            // Mocking the readContract method of the PublicClient instance
            const expectedTick = 42n;
            mockReadContract.mockResolvedValue(expectedTick);

            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);
            const result = await contract.getHighestPopulatedTick();
            expect(result).toEqual(expectedTick);
        });

        it('should throw an error when the contract call fails', async () => {
            // Mocking the readContract method to throw an error
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);

            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);

            await expect(contract.getHighestPopulatedTick()).rejects.toThrow(error);
        });
    });

    describe('getActionablePendingActions', () => {
        it('should throw an error if the call fails', async () => {
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);
            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);

            await expect(contract.getActionablePendingActions()).rejects.toThrow(error);
        });
        it('should return the pending actions and the corresponding raw indices', async () => {
            // biome-ignore format: unnecessary
            const contractCallResult = [
                [
                    {
                        action: 2, securityDepositValue: parseEther('1'), timestamp: 759974400,
                        to: '0x0000000000000000000000000000000000000001', validator: '0x0000000000000000000000000000000000000002',
                        var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                    },
                    {
                        action: 0, securityDepositValue: 0n, timestamp: 0,
                        to: zeroAddress, validator: zeroAddress,
                        var1: 0, var2: 0n, var3: 0n, var4: 0n, var5: 0n, var6: 0n, var7: 0n,
                    },
                    {
                        action: 4, securityDepositValue: parseEther('1'), timestamp: 1438226773,
                        to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                        var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                    },
                ] as PendingAction[],
                [12n, 0n, 42n] as bigint[],
            ];
            mockReadContract.mockResolvedValue(contractCallResult);
            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);

            const { pendingActions, rawIndices } = await contract.getActionablePendingActions();
            expect(pendingActions).toEqual(contractCallResult[0]);
            expect(rawIndices).toEqual(contractCallResult[1]);

            expect(mockReadContract.mock.lastCall?.[0].functionName).toEqual('getActionablePendingActions');
            expect(mockReadContract.mock.lastCall?.[0].args?.[0]).toEqual(zeroAddress);
        });
    });

    describe('simulateValidateActionablePendingActions', () => {
        it('should throw an error if the call fails', async () => {
            const error = new Error('Simulation failed');
            mockSimulateContract.mockRejectedValue(error);
            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);

            await expect(contract.simulateValidateActionablePendingActions([], [])).rejects.toThrow(error);
        });
        it('should throw an error if the call fails', async () => {
            mockSimulateContract.mockResolvedValue({
                result: 2n,
                request: {},
            } as any);
            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);

            const validatedPendingActionsCount = await contract.simulateValidateActionablePendingActions(
                ['0xPrice1', '0xPrice2'],
                [1n, 2n],
            );
            expect(validatedPendingActionsCount).toEqual(2n);
        });
    });

    describe('multicall', () => {
        it('should return results from multicall', async () => {
            // Mocking the multicall method of the PublicClient instance
            const expectedResults = [
                {
                    functionName: 'getHighestPopulatedTick',
                    result: 42n,
                    status: 'success',
                },
            ];
            mockMulticall.mockResolvedValue(expectedResults);

            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);
            const result = await contract.multicall([{ functionName: 'getHighestPopulatedTick' }]);
            expect(result).toEqual(expectedResults);
        });

        it('should handle errors correctly when multicall fails', async () => {
            // Mocking the multicall method to throw an error
            mockMulticall.mockRejectedValue(new Error('Multicall failed'));

            const contract = new UsdnProtocolContract(mockContractAddress, mockPublicClient, mockWalletClient);

            await expect(contract.multicall([{ functionName: 'getHighestPopulatedTick' }])).rejects.toThrow(
                'Multicall failed',
            );
        });
    });
});
