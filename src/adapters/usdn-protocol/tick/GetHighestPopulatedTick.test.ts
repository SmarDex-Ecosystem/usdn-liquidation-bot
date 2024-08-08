import { PublicClient } from 'viem';
import { describe, expect, it, vi } from 'vitest';
import GetHighestPopulatedTick from './GetHighestPopulatedTick.ts';

// Mocking viem and PublicClient
vi.mock('viem', () => {
    const readContract = vi.fn();
    return {
        PublicClient: vi.fn(() => ({
            readContract,
        })),
    };
});

// Mock implementation of newClient
const newClient = vi.fn(() => new PublicClient());

describe('GetHighestPopulatedTick', () => {
    const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';

    describe('getHighestPopulatedTick', () => {
        it('should return the highest populated tick', async () => {
            // Mocking the readContract method of the PublicClient instance
            const expectedTick = 42n;
            const mockedClientInstance = await newClient();
            mockedClientInstance.readContract.mockResolvedValue(expectedTick);

            const getHighestPopulatedTick = new GetHighestPopulatedTick(mockedClientInstance, mockContractAddress);
            const result = await getHighestPopulatedTick.getHighestPopulatedTick();
            expect(result).toEqual(expectedTick);
        });

        it('should throw an error when the contract call fails', async () => {
            // Mocking the readContract method to throw an error
            const mockedClientInstance = await newClient();
            mockedClientInstance.readContract.mockRejectedValue(new Error('Contract call failed'));

            const getHighestPopulatedTick = new GetHighestPopulatedTick(mockedClientInstance, mockContractAddress);

            await expect(getHighestPopulatedTick.getHighestPopulatedTick()).rejects.toThrow(
                'Error while fetching the highest populated tick.',
            );
        });
    });
});
