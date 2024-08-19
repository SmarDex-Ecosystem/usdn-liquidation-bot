import { beforeEach, afterAll, describe, expect, it, vi } from 'vitest';
import Etherscan from './Etherscan.js';

describe('Etherscan', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    describe('getGasPrice', () => {
        it('should return valid data', async () => {
            const apiKeyToken = 'your_api_key';
            const etherscan = new Etherscan(apiKeyToken);

            const validResponse = {
                status: '1',
                message: 'OK',
                result: {
                    LastBlock: 14856877,
                    SafeGasPrice: 100,
                    ProposeGasPrice: 120,
                    FastGasPrice: 150,
                    suggestedBaseFee: 140,
                    gasUsedRatio: '150',
                },
            };

            // Mock the global fetch function
            vi.stubGlobal(
                'fetch',
                vi.fn(() =>
                    Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(validResponse),
                    }),
                ),
            );

            const data = await etherscan.getGasPrice();
            expect(data).toEqual({
                fastPriorityFee: 150n * 10n ** 9n - 140n * 10n ** 9n,
                suggestedBaseFee: 140n * 10n ** 9n,
            });
        });

        it("should throw an error when status is not '1'", async () => {
            const apiKeyToken = 'your_api_key';
            const etherscan = new Etherscan(apiKeyToken);

            const invalidResponse = {
                status: '0',
                message: 'NOTOK',
                result: null,
            };

            // Mock the global fetch function
            vi.stubGlobal(
                'fetch',
                vi.fn(() =>
                    Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(invalidResponse),
                    }),
                ),
            );

            await expect(etherscan.getGasPrice()).rejects.toThrow(
                `Failed to fetch gas price: ${invalidResponse.message}`,
            );
        });

        it('should throw an error when fetch throws an exception', async () => {
            const apiKeyToken = 'your_api_key';
            const etherscan = new Etherscan(apiKeyToken);

            const errorMessage = 'Network Error';

            // Mock the global fetch function to throw an error
            vi.stubGlobal(
                'fetch',
                vi.fn(() => Promise.reject(new Error(errorMessage))),
            );

            await expect(etherscan.getGasPrice()).rejects.toThrow(`Failed to fetch gas price: ${errorMessage}`);
        });
    });
});
