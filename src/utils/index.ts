import { http, type Hex, createWalletClient, formatEther, publicActions, webSocket } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, sepolia } from 'viem/chains';

if (!process.env.TENDERLY_TESTNET_CHAIN_ID) {
    throw new Error('The env variable TENDERLY_TESTNET_CHAIN_ID is required for compatibility with Virtual Testnets');
}
export const tenderlyChainId = Number(process.env.TENDERLY_TESTNET_CHAIN_ID);

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
 * Returns the block time (in seconds) for the provided chain ID
 * @param chainId The ID of the chain
 * @returns The block time in seconds
 */
export function getBlockTime(chainId: number) {
    switch (chainId) {
        case tenderlyChainId:
            return 5;
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
    if (!process.env.RPC_URL) {
        throw new Error('RPC_URL not set');
    }

    const rpcUrl = new URL(process.env.RPC_URL);
    const privateKey: string | undefined = process.env.PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('Env var PRIVATE_KEY is not set');
    }

    const account = privateKeyToAccount(privateKey as Hex);
    const client = createWalletClient({
        transport: rpcUrl.protocol === 'https:' ? http(rpcUrl.toString()) : webSocket(rpcUrl.toString()),
        account: account,
        pollingInterval: 2000,
    }).extend(publicActions);

    return client;
}

/**
 * Get the balance of the bot
 * @returns The balance of the bot in ETH
 */
export async function getBotEthBalance() {
    const balanceInWei = await getBlockchainClient().getBalance({
        address: process.env.BOT_ADDRESS as Hex,
    });

    return formatEther(balanceInWei);
}
