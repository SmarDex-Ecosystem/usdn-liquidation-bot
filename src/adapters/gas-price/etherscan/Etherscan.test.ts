import axios from 'axios';
import { describe, expect, it, vi } from 'vitest';
import Etherscan from './Etherscan.js';

vi.mock('axios');

describe('Etherscan', () => {
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
                        suggestBaseFee: 150,
                        gasUsedRatio: '150',
                    },
                },
            };

            (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(validResponse);

            const data = await etherscan.getGasPrice();
            expect(data).toEqual(validResponse.data);
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

            (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(invalidResponse);

            await expect(etherscan.getGasPrice()).rejects.toThrow(
                `Error fetching gas oracle data: ${invalidResponse.data.message}`,
            );
        });

        it('should throw an error when axios throws an exception', async () => {
            const apiKeyToken = 'your_api_key';
            const etherscan = new Etherscan(apiKeyToken);

            const errorMessage = 'Network Error';
            (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

            await expect(etherscan.getGasPrice()).rejects.toThrow(
                `Error retrieving gas price from Etherscan: Error: ${errorMessage}`,
            );
        });
    });
});
