import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PythAdapter from './PythAdapter.ts';
import type { OraclePriceData } from '../types.ts';

vi.mock('@pythnetwork/hermes-client');

const pythPriceUpdate = {
    binary: {
        encoding: 'hex',
        data: [
            '504e41550100000003b801000000040d007eaadaf5d03dfcc924a28f9194e55b27aac957052168f64a296f0be5a11f935646f3501f748db0351193526d0c9459c2baab9064aafa1d297c4734aaca140cb8010294aa1c32098326d628e9db0a45a9a51316d35308ffa1b438e2b70f27356c315b519a14c080a3b2836e5f19d144812c4d9a714c48ad9af12403c3aeaf345a07440004135d71bb3ebb9a6eb137217fb46de37051e4e0cec9d01d63f6635e3e52411c221ed9e3d3b9c297e3a2c6c6923a9d78e2975c66af6fb35ae35a2f7a21baa86c2a0006a2221819bbd11862c643e573859bbdc0df555db8c6f411002af63abb1851479e524b2cf9bb5b3b316ec810301e3f07a4601b7a9933a8c378f55104b2f52a2903010896d0b34162757b53cf879e9ef08d89a077c2a0f8cd6a2ab61ccb2aa73872ccf93a3682e5b2d31845b9c7a6bf9ad647d87b84388c0f758917c5e04c9cf5b02a930009758c7afb8bd92a67127545a30b390511f64730ce0933b7ece5121344fa80e70a0e6601105eac79d1102ef1d1cb8698ae61a6b329f386f848a177af9357919c0b010a3f8862fb571cbbeefb72503f45755d52582f58347a0a900163822aebd9ef6ece7f7b503db49279c1bafab98d1192b57736b4da2def531fec4af9caabb7cbfa16010c2145b1e0dd0520f973affa2b190d0b901ff268d4e03cb4f7c2758c5ef25e237d12b71d029a942da73d2e48c83c87cc3b595db8a40691bc138ba080b81cd77d94000d243278c11b71e4107d0620377ea42d36371601320635a657e629506fe8eb9b2736d1caf20f507b51f06f3cad6ce26ed4a1d956501b18624d86d1dc107d84bc95000e8b3bae982d3a54318a72c26b92532e12fb5b2a865a62c022ce0d0dde2a9ba989606c352103fc0a88fc2f23247e500df79ded64381818b6b8128e5916ffa5db72010fa85f95986b2992f50dd18d7bced106b2c1a176972fefdb666a18c210ac61764263b299909a8e6b97954622f9fbaefc85666679d77363a41677102a8c723778710110cc83f7b3acb310a6bc6bf83f20ef79700fef76a13578c92c4d8a0afa6f27418b0ca1601c87a62c2592203658336e71e9864afb5d81c23949eef9a4962fd9e8870112a7c1d2409abdb6d16452331808db3b473ada823a10326fa4ba8f709d6f034e30551a5e7877d36c47b851a4a9c8f26838cb848a9b00cb3e166f662ea92ba367ce01669a127600000000001ae101faedac5851e32b9b23b5f9411a8c2bac4aae3ed4dd7b811dd1a72ea4aa710000000004243d5b01415557560000000000092ecdba000027104d32bf7359563d46562f7f5cb0a5e105a5140ccd01005500ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace0000004f99d04d57000000000e963008fffffff800000000669a127600000000669a12750000004fe3aa86a0000000001263d1400b09a0af4673655046ec3b293bea3693d6d51b7258f3de0546b85df5bdccacc3929761e00cf0131dbbd493df67aff457ed6ebd14eb9cb8f7a24c71bda4b8a3e32c86de10895c5fb0e88babf902e7277fb4bf60c587ea115ab3cbbe4e73e03dc67a0f3e8041a3e5438beec95cf677b4f862d55db40e99d265e17cdd3ebc496a7c93dce2e442dce934877f39af7941bdcceab21f4dea28b40c2707f84761925d206c9cb2cc1d8e97f3ac667a490f1bbc27cc9e7366ff33f199137765e91bd0e6a228beb2db29c3bcd8832e8e7327f68a5f97381f50db2474486bf79ddd69',
        ],
    },
    parsed: [
        {
            id: 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
            price: { expo: -8, price: '352100000000' },
        },
    ],
};

describe('PythAdapter', () => {
    beforeEach(() => {
        vi.stubEnv('HERMES_URL', 'a non-empty value');
    });
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.unstubAllEnvs();
    });

    describe('constructor', () => {
        it('should throw an error if the env variable HERMES_URL is not set', async () => {
            vi.stubEnv('HERMES_URL', '');

            expect(() => new PythAdapter()).to.throw('Environment variable HERMES_URL not set');
        });
    });

    describe('getLatestPrice', () => {
        it('should return valid data', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            vi.mocked(mockedClient).HermesClient.prototype.getLatestPriceUpdates = vi
                .fn()
                .mockImplementation(async () => {
                    return pythPriceUpdate;
                });

            const pythAdapter = new PythAdapter();
            const data = await pythAdapter.getLatestPrice();
            expect(data.price).toEqual(BigInt(pythPriceUpdate.parsed[0].price.price));
            expect(data.decimals).toEqual(8);
            expect(data.signature).toEqual(pythPriceUpdate.binary.data[0]);
        });

        it('should throw an error when the client throws an error', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            vi.mocked(mockedClient).HermesClient.prototype.getLatestPriceUpdates = vi
                .fn()
                .mockRejectedValue(new Error('mocked error'));
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Failed to get data from Pyth');
        });

        it('should throw an error when the client returns empty parsed data', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            vi.mocked(mockedClient).HermesClient.prototype.getLatestPriceUpdates = vi
                .fn()
                .mockImplementationOnce(async () => {
                    return { parsed: undefined };
                })
                .mockImplementationOnce(async () => {
                    return { parsed: null };
                })
                .mockImplementationOnce(async () => {
                    return { parsed: [] };
                });
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Pyth returned empty data');
            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Pyth returned empty data');
            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow('Pyth returned empty data');
        });

        it('should throw an error when the returned data does not contain a signature', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            vi.mocked(mockedClient).HermesClient.prototype.getLatestPriceUpdates = vi
                .fn()
                .mockImplementation(async () => {
                    const priceFeedDataModified = {
                        ...pythPriceUpdate,
                        binary: { data: [] },
                    };
                    return priceFeedDataModified;
                });
            const pythAdapter = new PythAdapter();

            await expect(pythAdapter.getLatestPrice()).to.rejects.toThrow(
                'Pyth did not return a signature for their price',
            );
        });
    });

    describe('getPriceAtTimestamp', () => {
        it('should return valid data', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            vi.mocked(mockedClient).HermesClient.prototype.getPriceUpdatesAtTimestamp = vi
                .fn()
                .mockImplementation(async () => {
                    return pythPriceUpdate;
                });

            const pythAdapter = new PythAdapter();
            const data = await pythAdapter.getPriceAtTimestamp(42);
            expect(data.price).toEqual(BigInt(pythPriceUpdate.parsed[0].price.price));
            expect(data.decimals).toEqual(8);
            expect(data.signature).toEqual(pythPriceUpdate.binary.data[0]);
        });
    });

    describe('subscribeToPriceUpdates', () => {
        it('should execute the callback on price update', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            const mockEventSource = { onmessage: vi.fn(), close: vi.fn() };
            vi.mocked(mockedClient).HermesClient.prototype.getPriceUpdatesStream = vi
                .fn()
                .mockImplementation(async (_priceFeeds) => {
                    return mockEventSource;
                });

            const callback = vi.fn();
            const pythAdapter = new PythAdapter();
            await pythAdapter.subscribeToPriceUpdates(callback);

            mockEventSource.onmessage({ data: JSON.stringify(pythPriceUpdate) } as MessageEvent);

            expect(callback).toHaveBeenCalledWith({
                price: BigInt(pythPriceUpdate.parsed[0].price.price),
                decimals: 8,
                signature: pythPriceUpdate.binary.data[0],
            } as OraclePriceData);
        });

        it('should not execute the callback if the data does not contain a signature', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            const mockEventSource = { onmessage: vi.fn(), close: vi.fn() };
            vi.mocked(mockedClient).HermesClient.prototype.getPriceUpdatesStream = vi
                .fn()
                .mockImplementation(async (_priceFeeds) => {
                    return mockEventSource;
                });

            const callback = vi.fn();
            const pythAdapter = new PythAdapter();
            await pythAdapter.subscribeToPriceUpdates(callback);

            const priceFeedDataModified = [
                {
                    ...pythPriceUpdate,
                    binary: { data: [] },
                },
            ];
            mockEventSource.onmessage({ data: JSON.stringify(priceFeedDataModified) } as MessageEvent);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('should not execute the callback if the data does not contain a signature', async () => {
            const mockedClient = await import('@pythnetwork/hermes-client');
            const mockEventSource = { onmessage: vi.fn(), close: vi.fn() };
            vi.mocked(mockedClient).HermesClient.prototype.getPriceUpdatesStream = vi
                .fn()
                .mockImplementation(async (_priceFeeds) => {
                    return mockEventSource;
                });

            const callback = vi.fn();
            const pythAdapter = new PythAdapter();
            await pythAdapter.subscribeToPriceUpdates(callback);

            let priceFeedDataModified = {
                ...pythPriceUpdate,
                parsed: undefined as undefined | null | undefined[],
            };
            mockEventSource.onmessage({ data: JSON.stringify(priceFeedDataModified) } as MessageEvent);
            expect(callback).toHaveBeenCalledTimes(0);

            priceFeedDataModified = {
                ...pythPriceUpdate,
                parsed: null,
            };
            mockEventSource.onmessage({ data: JSON.stringify(priceFeedDataModified) } as MessageEvent);
            expect(callback).toHaveBeenCalledTimes(0);

            priceFeedDataModified = {
                ...pythPriceUpdate,
                parsed: [],
            };
            mockEventSource.onmessage({ data: JSON.stringify(priceFeedDataModified) } as MessageEvent);
            expect(callback).toHaveBeenCalledTimes(0);
        });
    });
});
