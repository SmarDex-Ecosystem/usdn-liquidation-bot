import { parseEther, zeroAddress, type Address } from 'viem';
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
        });
    });

    describe('validateActionablePendingActions', () => {
        beforeEach(() => {
            mockSimulateContract.mockImplementation(
                (args) =>
                    ({
                        result: 2n,
                        request: args,
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

            const validatedPendingActionsCount = await contract.validateActionablePendingActions(
                ['0xPrice1', '0xPrice2'],
                [1n, 2n],
                42n,
            );
            expect(validatedPendingActionsCount).toEqual(2n);
            expect(mockWriteContract).toHaveBeenCalledOnce();
            // the provided oracle fee should have been forwarded as TX value
            expect(mockWriteContract.mock.calls[0][0].value).toEqual(42n);
        });
        it('should not launch a TX if the result of the simulation is == 0', async () => {
            mockSimulateContract.mockResolvedValue({
                result: 0n,
                request: {},
            } as any);
            const contract = new UsdnProtocolContract(mockContractAddress, mockBlockchainClient);

            const validatedPendingActionsCount = await contract.validateActionablePendingActions([], [], 0n);
            expect(validatedPendingActionsCount).toEqual(0n);
            expect(mockWriteContract).toBeCalledTimes(0);
        });
    });
});
