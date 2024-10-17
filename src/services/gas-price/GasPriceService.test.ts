import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type IGasPriceAdapter from '../../adapters/gas-price/IGasPriceAdapter.ts';
import GasPriceService from './GasPriceService.ts';

const mockedPrimaryAdapter: IGasPriceAdapter = { getGasPrice: vi.fn() };
const mockedFallbackAdapter: IGasPriceAdapter = { getGasPrice: vi.fn() };
const gasPriceService = new GasPriceService(mockedPrimaryAdapter, mockedFallbackAdapter);

const primaryAdapterResponse = {
    fastPriorityFee: 150n,
    suggestedBaseFee: 50n,
};

const fallbackAdapterResponse = {
    fastPriorityFee: 200n,
    suggestedBaseFee: 340n,
};

describe('GasPriceService', () => {
    beforeEach(async () => {
        vi.spyOn(mockedPrimaryAdapter, 'getGasPrice').mockResolvedValue(primaryAdapterResponse);
        vi.spyOn(mockedFallbackAdapter, 'getGasPrice').mockResolvedValue(fallbackAdapterResponse);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return gas price from the primary adapter by default', async () => {
            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual(primaryAdapterResponse);
        });

        it('should fall back to the secondary adapter if the primary adapter call fails', async () => {
            vi.spyOn(mockedPrimaryAdapter, 'getGasPrice').mockRejectedValue(new Error('Primary adapter failed'));

            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual(fallbackAdapterResponse);
        });
    });
});
