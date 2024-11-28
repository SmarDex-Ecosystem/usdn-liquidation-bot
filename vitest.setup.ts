import { vi } from 'vitest';
import { sepolia } from 'viem/chains';

// mock the blockchain client's getChainId function globally to avoid failing tests because of top level awaits
vi.mock('./src/utils/index.ts', async (importOriginal) => {
    const { getBlockchainClient, getBlockTime, tenderlyChainId } = (await importOriginal()) as {
        // biome-ignore lint/suspicious/noExplicitAny: tedious typing
        getBlockchainClient: () => any;
        sleep: () => Promise<undefined>;
        getBlockTime: () => number;
        tenderlyChainId: number;
    };
    return {
        getBlockchainClient: vi.fn().mockReturnValue({
            ...getBlockchainClient(),
            getChainId: vi.fn().mockResolvedValue(sepolia.id),
        }),
        getBlockTime,
        sleep: vi.fn(),
        tenderlyChainId,
    };
});
