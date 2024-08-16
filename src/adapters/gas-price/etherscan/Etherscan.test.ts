import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Etherscan from './Etherscan.js';

vi.mock('axios');

describe('Etherscan', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getGasPrice', () => {
        it('should return valid data', async () => {
            const apiKeyToken = 'your_api_key';
            const etherscan = new Etherscan(apiKeyToken);

            const validResponse = {
                data: {
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
                },
            };

            vi.mocked(axios.get).mockResolvedValue(validResponse);

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
                data: {
                    status: '0',
                    message: 'Error message',
                    result: null,
                },
            };

            vi.mocked(axios.get).mockResolvedValue(invalidResponse);

            await expect(etherscan.getGasPrice()).rejects.toThrow(
                `Failed to fetch gas price: ${invalidResponse.data.message}`,
            );
        });

        it('should throw an error when axios throws an exception', async () => {
            const apiKeyToken = 'your_api_key';
            const etherscan = new Etherscan(apiKeyToken);

            const errorMessage = 'Network Error';
            vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage));

            await expect(etherscan.getGasPrice()).rejects.toThrow(`Failed to fetch gas price: ${errorMessage}`);
        });
    });
});
