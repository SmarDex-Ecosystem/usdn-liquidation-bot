import { http, createPublicClient } from 'viem';
import { afterEach, describe, expect, it, vi } from 'vitest';
import WstETHContract from './WstETHContract.ts';
import { anvil } from 'viem/chains';

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
    chain: anvil,
    transport: http(),
});
const mockReadContract = vi.spyOn(mockPublicClient, 'readContract');

describe('WstETHContract', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('constructor', () => {
        it('should throw an error for an invalid Ethereum address', () => {
            const invalidAddress = '0xINVALID_ADDRESS';
            expect(() => new WstETHContract(mockPublicClient, invalidAddress)).toThrow('Invalid Ethereum address.');
        });

        it('should not throw an error for a valid Ethereum address', () => {
            expect(() => new WstETHContract(mockPublicClient, mockContractAddress)).not.toThrow();
        });
    });

    describe('getStETHPerToken', () => {
        it('should return the ratio of stETH to wstETH', async () => {
            // Mocking the readContract method of the PublicClient instance
            const expectedRatio = 12578n;
            mockReadContract.mockResolvedValue(expectedRatio);

            const contract = new WstETHContract(mockPublicClient, mockContractAddress);
            const result = await contract.getStETHPerToken();
            expect(result).toEqual(expectedRatio);
        });

        it('should throw an error when the contract call fails', async () => {
            // Mocking the readContract method to throw an error
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);

            const contract = new WstETHContract(mockPublicClient, mockContractAddress);

            await expect(contract.getStETHPerToken()).rejects.toThrow(error);
        });
    });
});
