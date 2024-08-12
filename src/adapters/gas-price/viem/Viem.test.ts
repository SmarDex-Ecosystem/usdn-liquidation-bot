import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import Viem from './Viem.ts';

// Mocking the viem and PublicClient
vi.mock('viem', () => {
    return {
        createPublicClient: vi.fn(() => ({
            getGasPrice: vi.fn(),
        })),
        http: vi.fn(),
        PublicClient: vi.fn(),
    };
});

// Mock implementation of newClient
const newClient = vi.fn(() =>
    Promise.resolve(
        createPublicClient({
            chain: mainnet,
            transport: http(),
        }),
    ),
);

describe('Viem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return valid data', async () => {
            // Mocking the getGasPrice method of the PublicClient instance
            const validGasPrice = 100000n;
            const mockedClientInstance = await newClient();
            (mockedClientInstance.getGasPrice as Mock).mockResolvedValue(validGasPrice);

            const viem = new Viem(mockedClientInstance);
            const data = await viem.getGasPrice();
            expect(data.high).toEqual(200000n);
            expect(data.baseFee).toEqual(0n);
        });

        it('should return valid 0n', async () => {
            // Mocking the getGasPrice method of the PublicClient instance to return 0n
            const validGasPrice = 0n;
            const mockedClientInstance = await newClient();
            (mockedClientInstance.getGasPrice as Mock).mockResolvedValue(validGasPrice);

            const viem = new Viem(mockedClientInstance);
            const data = await viem.getGasPrice();
            expect(data.high).toEqual(0n);
            expect(data.baseFee).toEqual(0n);
        });
    });
});
