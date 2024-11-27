import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getBlockchainClient } from '../../../utils/index.ts';
import OracleMiddleware from './OracleMiddlewareContract.ts';
import { maxUint16 } from 'viem';

const mockContractAddress = '0x1234567890abcdef1234567890abcdef12345678';
const mockBlockchainClient = getBlockchainClient();
const mockReadContract = vi.spyOn(mockBlockchainClient, 'readContract');

describe('OracleMiddlewareContract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    describe('constructor', () => {
        it('should throw an error for an invalid Ethereum address', () => {
            const invalidAddress = '0xINVALID_ADDRESS';
            expect(() => new OracleMiddleware(invalidAddress, mockBlockchainClient)).toThrow(
                'Invalid Ethereum address for the oracle middleware',
            );
        });

        it('should not throw an error for a valid Ethereum address', () => {
            expect(() => new OracleMiddleware(mockContractAddress, mockBlockchainClient)).not.toThrow();
        });
    });

    describe('getValidationDelay', () => {
        it('should throw an error if the call fails', async () => {
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);
            const contract = new OracleMiddleware(mockContractAddress, mockBlockchainClient);

            await expect(contract.getValidationDelay()).rejects.toThrow(error);
        });
        it('should throw an error if the returned value is above MAX_SAFE_INTEGER', async () => {
            mockReadContract.mockResolvedValue(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
            const contract = new OracleMiddleware(mockContractAddress, mockBlockchainClient);

            const error = new Error('The validation delay is higher than MAX_SAFE_INTEGER');
            await expect(contract.getValidationDelay()).rejects.toThrow(error);
        });
        it('should return a valid value', async () => {
            mockReadContract.mockResolvedValue(BigInt(Number.MAX_SAFE_INTEGER));
            const contract = new OracleMiddleware(mockContractAddress, mockBlockchainClient);

            await expect(contract.getValidationDelay()).resolves.toEqual(Number.MAX_SAFE_INTEGER);
        });
    });

    describe('getLowLatencyDelay', () => {
        it('should throw an error if the call fails', async () => {
            const error = new Error('Contract call failed');
            mockReadContract.mockRejectedValue(error);
            const contract = new OracleMiddleware(mockContractAddress, mockBlockchainClient);

            await expect(contract.getLowLatencyDelay()).rejects.toThrow(error);
        });
        it('should return a valid value', async () => {
            mockReadContract.mockResolvedValue(maxUint16);
            const contract = new OracleMiddleware(mockContractAddress, mockBlockchainClient);

            await expect(contract.getLowLatencyDelay()).resolves.toEqual(maxUint16);
        });
    });
});
