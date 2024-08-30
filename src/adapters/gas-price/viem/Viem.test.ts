import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import Viem from './Viem.ts';

// Mocking the viem and PublicClient
vi.mock('viem', () => {
    return {
        createPublicClient: vi.fn(() => ({
            estimateFeesPerGas: vi.fn(),
        })),
        http: vi.fn(),
        PublicClient: vi.fn(),
    };
});

// Mock implementation of getBlockchainClient
const getBlockchainClient = vi.fn(() =>
    createPublicClient({
        chain: mainnet,
        transport: http(),
    }),
);

describe('Viem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return valid data', async () => {
            // Mocking the estimateFeesPerGas method of the PublicClient instance
            const mockedGasPrice = {
                maxPriorityFeePerGas: 200000n,
                maxFeePerGas: 300000n,
            };
            const mockedClientInstance = getBlockchainClient();
            (mockedClientInstance.estimateFeesPerGas as Mock).mockResolvedValue(mockedGasPrice);

            const viem = new Viem(mockedClientInstance);
            const data = await viem.getGasPrice();
            expect(data.fastPriorityFee).toEqual(mockedGasPrice.maxPriorityFeePerGas);
            expect(data.suggestedBaseFee).toEqual(mockedGasPrice.maxFeePerGas);
        });

        it('should return valid 0n when estimateFeesPerGas returns zeros', async () => {
            // Mocking the estimateFeesPerGas method to return 0n values
            const mockedGasPrice = {
                maxPriorityFeePerGas: 0n,
                maxFeePerGas: 0n,
            };
            const mockedClientInstance = getBlockchainClient();
            (mockedClientInstance.estimateFeesPerGas as Mock).mockResolvedValue(mockedGasPrice);

            const viem = new Viem(mockedClientInstance);
            const data = await viem.getGasPrice();
            expect(data.fastPriorityFee).toEqual(0n);
            expect(data.suggestedBaseFee).toEqual(0n);
        });
    });
});
