import { http, createPublicClient, type Log } from 'viem';
import { mainnet } from 'viem/chains';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsdnProtocolContract from './UsdnProtocolContract.ts';

// Mocking the PublicClient methods
vi.mock('viem', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        PublicClient: vi.fn().mockImplementation(() => ({
            readContract: vi.fn(),
            multicall: vi.fn(),
            watchContractEvent: vi.fn(),
        })),
    };
});

// Test setup
const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';
const mockPublicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});
const mockWatchContractEvent = vi.spyOn(mockPublicClient, 'watchContractEvent');
const mockReadContract = vi.spyOn(mockPublicClient, 'readContract');
const mockMulticall = vi.spyOn(mockPublicClient, 'multicall');

describe('UsdnProtocolContract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should throw an error for an invalid Ethereum address', () => {
            const invalidAddress = '0xINVALID_ADDRESS';
            expect(() => new UsdnProtocolContract(mockPublicClient, invalidAddress)).toThrow(
                'Invalid Ethereum address.',
            );
        });

        it('should not throw an error for a valid Ethereum address', () => {
            expect(() => new UsdnProtocolContract(mockPublicClient, mockContractAddress)).not.toThrow();
        });
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
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);

            await expect(contract.getHighestPopulatedTick()).rejects.toThrow(error);
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
            const result = await contract.multicall([{ functionName: 'getHighestPopulatedTick' }]);
            expect(result).toEqual(expectedResults);
        });

        it('should handle errors correctly when multicall fails', async () => {
            // Mocking the multicall method to throw an error
            mockMulticall.mockRejectedValue(new Error('Multicall failed'));

            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);

            await expect(contract.multicall([{ functionName: 'getHighestPopulatedTick' }])).rejects.toThrow(
                'Multicall failed',
            );
        });
    });

    describe('watchEvent', () => {
        it('should update highestPopulatedTick when the event is triggered', async () => {
            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);

            // Mock the watchContractEvent to call the onLogs callback
            const unwatchMock = vi.fn();
            mockWatchContractEvent.mockImplementation(({ onLogs }) => {
                onLogs([{ args: { tick: 258 } }, { args: { tick: 8965 } }] as unknown as Log[]);
                return unwatchMock;
            });

            contract.watchEvent();

            expect(contract.highestPopulatedTickStored).toBe(8965);
            expect(unwatchMock).not.toHaveBeenCalled();
        });

        it('should stop updating highestPopulatedTick when unwatch is called', async () => {
            const contract = new UsdnProtocolContract(mockPublicClient, mockContractAddress);

            const unwatchMock = vi.fn();

            mockWatchContractEvent.mockImplementation(({ onLogs }) => {
                onLogs([{ args: { tick: 258 } }, { args: { tick: 8965 } }] as unknown as Log[]);

                setTimeout(() => {
                    onLogs([{ args: { tick: 123 } }, { args: { tick: 464 } }] as unknown as Log[]);
                }, 2000);

                setTimeout(() => {
                    onLogs([{ args: { tick: 123 } }, { args: { tick: 87164 } }] as unknown as Log[]);
                }, 20000);

                return unwatchMock;
            });
            const unwatch = contract.watchEvent();
            expect(contract.highestPopulatedTickStored).toBe(8965);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            expect(contract.highestPopulatedTickStored).toBe(464);
            unwatch();

            expect(contract.highestPopulatedTickStored).toBe(464);
            expect(unwatchMock).toHaveBeenCalled();
        });
    });
});
