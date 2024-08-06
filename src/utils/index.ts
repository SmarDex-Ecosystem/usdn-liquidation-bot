import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';

export async function sleep(milliseconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

export async function newClient() {
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
