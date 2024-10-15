import { http, type Hex, publicActions, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, sepolia } from 'viem/chains';

/**
 * Sleep for the specified amount of milliseconds
 * @param milliseconds The amount of time (in milliseconds) to sleep
 */
export async function sleep(milliseconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

export function getBlockTime(chainId: number) {
    switch (chainId) {
        case mainnet.id:
            return 12;
        case sepolia.id:
            return 12;
        default:
            throw new Error(`Unsupported chain ID ${chainId}`);
    }
}

/**
 * Creates a client to interact with the blockchain
 *
 * Requires RPC_URL (HTTP) and PRIVATE_KEY set in the environment variables
 * @returns A public client to read data from the blockchain and sign transactions
 */
export function getBlockchainClient() {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        throw new Error('RPC_URL not set');
    }

    const privateKey: string | undefined = process.env.PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('Env var PRIVATE_KEY is not set');
    }

    const account = privateKeyToAccount(privateKey as Hex);
    const client = createWalletClient({
        transport: http(process.env.RPC_URL),
        account: account,
        pollingInterval: 2000,
    }).extend(publicActions);

    return client;
}
