import {} from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Viem from './Viem.ts';
import { getBlockchainClient } from '../../../utils/index.ts';

const blockchainClient = getBlockchainClient();
describe('Viem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return valid data', async () => {
            // Mocking the estimateFeesPerGas method of the blockchain client
            const mockedGasPrice = {
                maxPriorityFeePerGas: 200000n,
                maxFeePerGas: 300000n,
            };
            vi.spyOn(blockchainClient, 'estimateFeesPerGas').mockResolvedValue(mockedGasPrice);

            const viem = new Viem(blockchainClient);
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
            const blockchainClient = getBlockchainClient();
            vi.spyOn(blockchainClient, 'estimateFeesPerGas').mockResolvedValue(mockedGasPrice);

            const viem = new Viem(blockchainClient);
            const data = await viem.getGasPrice();
            expect(data.fastPriorityFee).toEqual(0n);
            expect(data.suggestedBaseFee).toEqual(0n);
        });
    });
});
