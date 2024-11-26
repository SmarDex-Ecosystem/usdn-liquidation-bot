import { maxUint256, parseEther, zeroAddress, type Address } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsdnProtocolContract from './UsdnProtocolContract.ts';
import { getBlockchainClient } from '../../../utils/index.ts';

type PendingAction = {
    action: number;
    timestamp: number;
    to: Address;
    validator: Address;
    securityDepositValue: bigint;
    var1: number;
    var2: bigint;
    var3: bigint;
    var4: bigint;
    var5: bigint;
    var6: bigint;
    var7: bigint;
};

// Test setup
const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';
const mockBlockchainClient = getBlockchainClient();
const mockSimulateContract = vi.spyOn(mockBlockchainClient, 'simulateContract');
const mockWriteContract = vi.spyOn(mockBlockchainClient, 'writeContract');
const mockReadContract = vi.spyOn(mockBlockchainClient, 'readContract');

describe('UsdnProtocolContract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('constructor', () => {
        it('should throw an error for an invalid Ethereum address', () => {
            const invalidAddress = '0xINVALID_ADDRESS';
            expect(() => new UsdnProtocolContract(invalidAddress, mockBlockchainClient)).toThrow(
                'Invalid Ethereum address for the USDN protocol',
            );
        });

        it('should not throw an error for a valid Ethereum address', () => {
            expect(() => new UsdnProtocolContract(mockContractAddress, mockBlockchainClient)).not.toThrow();
        });
    });

    describe('getActionablePendingActions', () => {
        it('should throw an error if the call fails', async () => {
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

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
                        action: 4, securityDepositValue: parseEther('1'), timestamp: 1438226773,
                        to: '0x0000000000000000000000000000000000000003', validator: '0x0000000000000000000000000000000000000004',
                        var1: 1, var2: 2n, var3: 3n, var4: 4n, var5: 5n, var6: 6n, var7: 7n,
                    },
                ] as PendingAction[],
                [12n, 42n] as bigint[],
            ];
            mockReadContract.mockResolvedValue(contractCallResult);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            const { pendingActions, rawIndices } = await contract.getActionablePendingActions();
            expect(pendingActions).toEqual(contractCallResult[0]);
            expect(rawIndices).toEqual(contractCallResult[1]);

            expect(mockReadContract.mock.lastCall?.[0].functionName).toEqual('getActionablePendingActions');
            expect(mockReadContract.mock.lastCall?.[0].args?.[0]).toEqual(zeroAddress);
            expect(mockReadContract.mock.lastCall?.[0].args?.[1]).toEqual(0n);
            expect(mockReadContract.mock.lastCall?.[0].args?.[2]).toEqual(maxUint256);
        });
    });

    describe('validateActionablePendingActions', () => {
        beforeEach(() => {
            mockWriteContract.mockResolvedValue('0xHash');
            mockSimulateContract.mockImplementation(
                (args) =>
                    ({
                        request: args,
                        result: 2n,
                    }) as any,
            );
        });

        it('should throw an error if the simulation fails', async () => {
            const error = new Error('Simulation failed');
            mockSimulateContract.mockRejectedValue(error);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            await expect(contract.validateActionablePendingActions([], [], 0n)).rejects.toThrow(error);
        });
        it('should throw an error if the tx fails', async () => {
            const error = new Error('TX failed');
            mockWriteContract.mockRejectedValue(error);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            await expect(contract.validateActionablePendingActions([], [], 0n)).rejects.toThrow(error);
        });
        it('should launch a TX if the result of the simulation is > 0', async () => {
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);
            const { validatedActionsAmount, hash } = await contract.validateActionablePendingActions(
                ['0xPrice1', '0xPrice2'],
                [1n, 2n],
                42n,
            );

            expect(validatedActionsAmount).toEqual(2n);
            expect(hash).toEqual('0xHash');
            expect(mockWriteContract).toHaveBeenCalledOnce();
            // the provided oracle fee should have been forwarded as TX value
            expect(mockWriteContract.mock.calls[0][0].value).toEqual(42n);
        });
        it('should not launch a TX if the result of the simulation is == 0', async () => {
            mockSimulateContract.mockResolvedValue({ request: {}, result: 0n } as any);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            const { validatedActionsAmount, hash } = await contract.validateActionablePendingActions([], [], 0n);
            expect(validatedActionsAmount).toEqual(0n);
            expect(hash).toBeUndefined();
            expect(mockWriteContract).toBeCalledTimes(0);
        });
    });

    describe('liquidate', () => {
        it('should throw an error if the simulation fails', async () => {
            const error = new Error('simulation failed');
            mockSimulateContract.mockRejectedValue(error);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            await expect(contract.liquidate('0xPriceSignature', 0n)).rejects.toThrow(error);
        });
        it('should throw an error if the TX launch fails', async () => {
            mockSimulateContract.mockResolvedValue({ request: {}, result: [{ totalPositions: 42n }] } as any);
            const error = new Error('failed to launch TX');
            mockWriteContract.mockRejectedValue(error);

            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            await expect(contract.liquidate('0xPriceSignature', 0n)).rejects.toThrow(error);
        });
        it('should return the amount of positions liquidated by the simulation', async () => {
            const oracleFee = 1n;
            mockSimulateContract.mockResolvedValue({
                request: { value: oracleFee },
                result: [{ totalPositions: 1n }, { totalPositions: 2n }],
            } as any);
            mockWriteContract.mockResolvedValue('0xHash');
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            const { liquidatedTicksAmount, hash } = await contract.liquidate('0xPriceSignature', oracleFee);
            expect(liquidatedTicksAmount).toEqual(2);
            expect(hash).toEqual('0xHash');
            // the provided oracle fee should have been forwarded as TX value
            expect(mockWriteContract.mock.calls[0][0].value).toEqual(1n);
        });
        it('should not launch a TX if the result of the simulation is an empty array', async () => {
            mockSimulateContract.mockResolvedValue({ result: [] } as any);
            mockWriteContract.mockResolvedValue('0xHash');
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            const { liquidatedTicksAmount, hash } = await contract.liquidate('0xPriceSignature', 1n);
            expect(liquidatedTicksAmount).toEqual(0);
            expect(hash).toBeUndefined();
            expect(mockWriteContract).toBeCalledTimes(0);
        });
    });
});
