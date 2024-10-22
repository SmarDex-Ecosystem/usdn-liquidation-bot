import { vi } from 'vitest';
import { sepolia } from 'viem/chains';

// mock the blockchain client's getChainId function globally to avoid failing tests because of top level awaits
vi.mock('./src/utils/index.ts', async (importOriginal) => {
    const { getBlockchainClient, getBlockTime } = (await importOriginal()) as {
        // biome-ignore lint/suspicious/noExplicitAny: tedious typing
        getBlockchainClient: () => any;
        getBlockTime: () => number;
    };
    return {
        getBlockchainClient: vi.fn().mockReturnValue({
            ...getBlockchainClient(),
            getChainId: vi.fn().mockResolvedValue(sepolia.id),
        }),
        getBlockTime,
    };
});
