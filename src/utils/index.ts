import { http, createPublicClient, createWalletClient, type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
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

/**
 * Creates a public client to read data from the blockchain
 *
 * Requires an RPC URL (HTTP) set in the environment variables
 * @returns A public client to read data from the blockchain
 */
export function getBlockchainClient() {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        throw new Error('RPC_URL not set');
    }

    const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(rpcUrl),
    });

    return publicClient;
}

/**
 * Creates a wallet client to write on the blockchain
 *
 * Requires an RPC URL and a private key set in the environment variables
 * @returns A wallet client that can be used to simulate and sign transactions
 */
export function getWalletClient() {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        throw new Error('RPC_URL not set');
    }

    const privateKey: string | undefined = process.env.PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('Env var PRIVATE_KEY is not set');
    }

    const account = privateKeyToAccount(privateKey as Hex);
    const publicClient = createWalletClient({
        transport: http(process.env.RPC_URL),
        account: account,
    });

    return publicClient;
}
