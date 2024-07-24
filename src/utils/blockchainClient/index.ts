import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';

export const client = createPublicClient({
    chain: mainnet,
    transport: http(process.env.RPC_URL),
});
