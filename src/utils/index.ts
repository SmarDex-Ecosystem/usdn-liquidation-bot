import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';

/**
 * Sleep for the specified amount of milliseconds
 * @param milliseconds The amount of time (in milliseconds) to sleep
 */
export async function sleep(milliseconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

export function getBlockchainClient() {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        throw new Error('RPC URL not set');
    }

    const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(rpcUrl),
    });

    return publicClient;
}
