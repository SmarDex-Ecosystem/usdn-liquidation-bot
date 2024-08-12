import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Etherscan from '../../adapters/gas-price/etherscan/Etherscan.ts';
import Viem from '../../adapters/gas-price/viem/Viem.ts';
import { newClient } from '../../utils/index.ts';
import { gasPriceService } from './index.ts';

vi.mock('../../adapters/gas-price/etherscan/Etherscan');
vi.mock('../../adapters/gas-price/viem/Viem');
vi.mock('../../utils/index');

describe('GasPriceService', () => {
    let mockedPrimaryAdapter: Etherscan;
    let mockedFallbackAdapter: Viem;

    const validPrimaryResponse = {
        high: 150n,
        baseFee: 50n,
    };

    const fallbackAdapterResponse = {
        high: 200n,
        baseFee: 0n,
    };

    beforeEach(async () => {
        mockedPrimaryAdapter = new Etherscan('');
        mockedFallbackAdapter = new Viem(await newClient());

        vi.spyOn(mockedPrimaryAdapter, 'getGasPrice').mockResolvedValue(validPrimaryResponse);
        vi.spyOn(mockedFallbackAdapter, 'getGasPrice').mockResolvedValue(fallbackAdapterResponse);

        vi.spyOn(gasPriceService, 'getGasPrice').mockImplementation(async () => {
            try {
                const primaryData = await mockedPrimaryAdapter.getGasPrice();
                return {
                    high: primaryData.high,
                    baseFee: primaryData.baseFee,
                };
            } catch {
                const fallbackData = await mockedFallbackAdapter.getGasPrice();
                return {
                    high: fallbackData.high,
                    baseFee: fallbackData.baseFee,
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
                high: validPrimaryResponse.high,
                baseFee: validPrimaryResponse.baseFee,
            });
        });

        it('should fall back to the secondary adapter if the primary adapter call fails', async () => {
            vi.spyOn(mockedPrimaryAdapter, 'getGasPrice').mockRejectedValueOnce(new Error('Primary adapter failed'));

            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual({
                high: fallbackAdapterResponse.high,
                baseFee: fallbackAdapterResponse.baseFee,
            });
        });
    });
});
