import { createPublicClient, createWalletClient, http, webSocket } from 'viem';
import { chainlinkAdapter, pythAdapter } from './adapters/oracles/index.ts';
import { gasPriceService } from './services/gas-price/index.ts';
import type { OraclePriceData } from './adapters/oracles/types.ts';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import UsdnProtocolContract from './adapters/blockchain/usdn/contract/UsdnProtocolContract.ts';

/* --------------------------- create read client --------------------------- */
const client = createPublicClient({
    transport: webSocket(process.env.RPC_WSS_URL),
    chain: sepolia,
});

/* --------------------------- create write client -------------------------- */
const privateKey: string | undefined = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error('Env var PRIVATE_KEY is not defined');
}
const account = privateKeyToAccount(privateKey as `0x${string}`);
console.log(`Address ${account.address} will sign transactions`);
const wallet = createWalletClient({
    transport: http(process.env.RPC_HTTP_URL),
    account: account,
    chain: sepolia,
});

/* --------------------------- instantiate classes -------------------------- */
const usdnProtocol = new UsdnProtocolContract(client, wallet, gasPriceService);

/* ---------------------------------- data ---------------------------------- */

const lowestPriceForBlock = new Map<bigint, OraclePriceData>();
let lastBlockNumber = 0n;

/* -------------------------------- functions ------------------------------- */

const validatePendingActions = async () => {
    const [pendingActions, rawIndices] = await usdnProtocol.getActionablePendingActions();
    const pendingActionsData: `0x${string}`[] = [];
    for (let i = 0; i < pendingActions.length; i++) {
        const pendingAction = pendingActions[i];
        if (pendingAction.action === 0) {
            pendingActionsData.push('0x0');
            continue;
        }

        const validationDelay = 20 * 60;
        const priceData = await chainlinkAdapter.getPriceAtTimestamp(pendingAction.timestamp + validationDelay);
        pendingActionsData.push(priceData.signature as `0x${string}`);
    }

    const result = await usdnProtocol.validateActionablePendingActions(pendingActionsData, rawIndices);
    if (result.amount === 0n) return;

    console.log(`⚡ Pending actions validated - ${result.amount} actions to validate - Hash ${result.txHash}`);
};

const watchPythPrice = async () => {
    lastBlockNumber = await client.getBlockNumber();
    const latestPrice = await pythAdapter.getLatestPrice();
    lowestPriceForBlock.set(lastBlockNumber, latestPrice);

    pythAdapter.subscribeToPriceUpdates((priceData) => {
        const lowestPrice = lowestPriceForBlock.get(lastBlockNumber);
        if (lowestPrice === undefined || priceData.price < lowestPrice.price) {
            lowestPriceForBlock.set(lastBlockNumber, priceData);
        }
    });
};

const liquidate = async (blockNumber: bigint) => {
    const previousBlockNumber = blockNumber - 1n;
    const lowestPrice = lowestPriceForBlock.get(previousBlockNumber);
    if (lowestPrice) {
        console.log(
            `🟩 Lowest Pyth ETH/USD: ${Math.floor((Number(lowestPrice.price) / 10 ** lowestPrice.decimals) * 100) / 100}`,
        );
    } else {
        throw new Error(`⚠️⚠️⚠️ Did not receive any prices for block ${previousBlockNumber}`);
    }

    const positionsToLiquidate = await usdnProtocol.liquidate(lowestPrice);
    if (positionsToLiquidate.amount > 0n) {
        console.log(
            `🚨 Liquidations - ${positionsToLiquidate.amount} to liquidate - Hash: ${positionsToLiquidate.txHash}`,
        );
    }
};

watchPythPrice();
const unwatch = client.watchBlockNumber({
    onBlockNumber: async (blockNumber) => {
        console.log(`🔵 Block number ${blockNumber} at ${new Date().toISOString()}`);
        validatePendingActions();
        liquidate(blockNumber);
        lastBlockNumber = blockNumber;
        console.log('------------------------------------ - -----------------------------------');
    },
    onError(error) {
        throw new Error(`Cannot continue watching block numbers: ${error}`);
    },
});

process.on('SIGINT', () => {
    unwatch();
    client.transport.getRpcClient().then((rpc) => {
        rpc.socket.close();
        console.log('Viem websocket closed');
    });
});
