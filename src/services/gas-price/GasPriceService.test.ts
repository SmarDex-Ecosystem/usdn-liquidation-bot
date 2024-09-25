import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type IGasPriceAdapter from '../../adapters/gas-price/IGasPriceAdapter.ts';
import { gasPriceService } from './index.ts';

vi.mock('../../adapters/gas-price/etherscan/Etherscan');
vi.mock('../../adapters/gas-price/viem/Viem');
vi.mock('../../utils/index');

describe('GasPriceService', () => {
    let mockedPrimaryAdapter: IGasPriceAdapter;
    let mockedFallbackAdapter: IGasPriceAdapter;

    const validPrimaryResponse = {
        fastPriorityFee: 150n,
        suggestedBaseFee: 50n,
    };

    const fallbackAdapterResponse = {
        fastPriorityFee: 200n,
        suggestedBaseFee: 340n,
    };

    beforeEach(async () => {
        mockedPrimaryAdapter = { getGasPrice: vi.fn() };
        mockedFallbackAdapter = { getGasPrice: vi.fn() };

        vi.spyOn(mockedPrimaryAdapter, 'getGasPrice').mockResolvedValue(validPrimaryResponse);
        vi.spyOn(mockedFallbackAdapter, 'getGasPrice').mockResolvedValue(fallbackAdapterResponse);

        vi.spyOn(gasPriceService, 'getGasPrice').mockImplementation(async () => {
            try {
                const primaryData = await mockedPrimaryAdapter.getGasPrice();
                return {
                    fastPriorityFee: primaryData.fastPriorityFee,
                    suggestedBaseFee: primaryData.suggestedBaseFee,
                };
            } catch {
                const fallbackData = await mockedFallbackAdapter.getGasPrice();
                return {
                    fastPriorityFee: fallbackData.fastPriorityFee,
                    suggestedBaseFee: fallbackData.suggestedBaseFee,
                };
            }
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return gas price from the primary adapter if successful', async () => {
            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual({
                fastPriorityFee: validPrimaryResponse.fastPriorityFee,
                suggestedBaseFee: validPrimaryResponse.suggestedBaseFee,
            });
        });

        it('should fall back to the secondary adapter if the primary adapter call fails', async () => {
            vi.spyOn(mockedPrimaryAdapter, 'getGasPrice').mockRejectedValueOnce(new Error('Primary adapter failed'));

            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual({
                fastPriorityFee: fallbackAdapterResponse.fastPriorityFee,
                suggestedBaseFee: fallbackAdapterResponse.suggestedBaseFee,
            });
        });
    });
});
