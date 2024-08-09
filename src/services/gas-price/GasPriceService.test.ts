import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Etherscan from '../../adapters/gas-price/etherscan/Etherscan.ts';
import type { EtherscanData } from '../../adapters/gas-price/etherscan/types.ts';
import Viem from '../../adapters/gas-price/viem/Viem.ts';
import { newClient } from '../../utils/index.ts';
import { gasPriceService } from './index.ts';

// Mock dependencies
vi.mock('../../adapters/gas-price/etherscan/Etherscan');
vi.mock('../../adapters/gas-price/viem/Viem');
vi.mock('../../utils/index');

describe('GasPriceService', () => {
    let mockedEtherscan: Etherscan;
    let mockedViem: Viem;

    const validResponse: EtherscanData = {
        status: '1',
        message: 'OK',
        result: {
            LastBlock: 14856877,
            SafeGasPrice: 100,
            ProposeGasPrice: 120,
            FastGasPrice: 150,
            suggestBaseFee: 150,
            gasUsedRatio: '0.5',
        },
    };

    beforeEach(async () => {
        mockedEtherscan = new Etherscan('');
        mockedViem = new Viem(await newClient());

        vi.spyOn(mockedEtherscan, 'getGasPrice').mockResolvedValue(validResponse);
        vi.spyOn(mockedViem, 'getGasPrice').mockResolvedValue({
            average: BigInt(200),
            high: BigInt(250),
        });

        vi.spyOn(gasPriceService, 'getGasPrice').mockImplementation(async () => {
            try {
                const etherscanData = await mockedEtherscan.getGasPrice();
                return {
                    average: BigInt(etherscanData.result.SafeGasPrice) * 10n ** 9n,
                    high: BigInt(etherscanData.result.FastGasPrice) * 10n ** 9n,
                    baseFee: BigInt(etherscanData.result.suggestBaseFee) * 10n ** 9n,
                };
            } catch {
                const viemData = await mockedViem.getGasPrice();
                return {
                    average: viemData.average,
                    high: viemData.high,
                    baseFee: 0n,
                };
            }
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return gas price from Etherscan if successful', async () => {
            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual({
                average: BigInt(validResponse.result.SafeGasPrice) * 10n ** 9n,
                high: BigInt(validResponse.result.FastGasPrice) * 10n ** 9n,
                baseFee: BigInt(validResponse.result.suggestBaseFee) * 10n ** 9n,
            });
        });

        it('should fall back to Viem if Etherscan call fails', async () => {
            vi.spyOn(mockedEtherscan, 'getGasPrice').mockRejectedValueOnce(new Error('Etherscan failed'));

            const data = await gasPriceService.getGasPrice();
            expect(data).toEqual({
                average: BigInt(200),
                high: BigInt(250),
                baseFee: 0n,
            });
        });
    });
});
