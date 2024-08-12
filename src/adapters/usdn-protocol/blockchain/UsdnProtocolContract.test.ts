import { createPublicClient, http } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsdnProtocolContract from './UsdnProtocolContract.ts';
import { mainnet } from 'viem/chains';

// Mocking viem and PublicClient with partial mocking
vi.mock('viem', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        PublicClient: vi.fn(() => ({
            readContract: vi.fn(),
            multicall: vi.fn(),
        })),
    };
});

// Test setup
const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';
const mockPublicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});
const mockReadContract = vi.spyOn(mockPublicClient, 'readContract');
const mockMulticall = vi.spyOn(mockPublicClient, 'multicall');

describe('UsdnProtocolContract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getHighestPopulatedTick', () => {
        it('should return the highest populated tick', async () => {
            // Mocking the readContract method of the PublicClient instance
            const expectedTick = 42n;
            mockReadContract.mockResolvedValue(expectedTick);

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);
            const result = await contract.getHighestPopulatedTick();
            expect(result).toEqual(expectedTick);
        });

        it('should throw an error when the contract call fails', async () => {
            // Mocking the readContract method to throw an error
            mockReadContract.mockRejectedValue(new Error('Contract call failed'));

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);

            await expect(contract.getHighestPopulatedTick()).rejects.toThrow('Contract call failed');
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

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);
            const result = await contract.multicall();
            expect(result).toEqual(expectedResults);
        });

        it('should handle errors correctly when multicall fails', async () => {
            // Mocking the multicall method to throw an error
            mockMulticall.mockRejectedValue(new Error('Multicall failed'));

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);

            // Expect the promise to reject with the specific error
            await expect(contract.multicall()).rejects.toThrow('Multicall failed');
        });

        it('should handle partial failure of multicall', async () => {
            // Mocking the multicall method to return partial failure
            const partialFailureResults = [
                {
                    error: new Error('Function call failed'),
                    status: 'failure',
                },
            ];
            mockMulticall.mockResolvedValue(partialFailureResults);

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);
            const result = await contract.multicall();
            expect(result).toEqual(partialFailureResults);
        });
    });
});
