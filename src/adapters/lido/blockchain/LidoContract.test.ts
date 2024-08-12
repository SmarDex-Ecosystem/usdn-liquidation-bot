import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LidoContract from './LidoContract.ts';

// Mocking the PublicClient methods
vi.mock('viem', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        PublicClient: vi.fn().mockImplementation(() => ({
            readContract: vi.fn(),
        })),
    };
});

const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';
const mockPublicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});
const mockReadContract = vi.spyOn(mockPublicClient, 'readContract');

describe('LidoContract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should throw an error for an invalid Ethereum address', () => {
            const invalidAddress = '0xINVALID_ADDRESS';
            expect(() => new LidoContract(mockPublicClient, invalidAddress)).toThrow('Invalid Ethereum address.');
        });

        it('should not throw an error for a valid Ethereum address', () => {
            expect(() => new LidoContract(mockPublicClient, mockContractAddress)).not.toThrow();
        });
    });

    describe('getStETHPerToken', () => {
        it('should return the ratio of stETH to wstETH', async () => {
            // Mocking the readContract method of the PublicClient instance
            const expectedRatio = 12578n;
            mockReadContract.mockResolvedValue(expectedRatio);

            const contract = new LidoContract(mockPublicClient, mockContractAddress);
            const result = await contract.getStETHPerToken();
            expect(result).toEqual(expectedRatio);
        });

        it('should throw an error when the contract call fails', async () => {
            // Mocking the readContract method to throw an error
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);

            const contract = new LidoContract(mockPublicClient, mockContractAddress);

            await expect(contract.getStETHPerToken()).rejects.toThrow(error);
        });
    });
});
