import { createPublicClient, createWalletClient, http, webSocket } from 'viem';
import { pythAdapter, redstoneAdapter } from './adapters/oracles/index.ts';
import { gasPriceService } from './services/gas-price/index.ts';
import { sepolia } from 'viem/chains';
import type { OraclePriceData } from './adapters/oracles/types.ts';
import UsdnProtocolContract from './adapters/blockchain/usdn/contract/UsdnProtocolContract.ts';
import { privateKeyToAccount } from 'viem/accounts';

const main = async () => {
    console.log('Latest Redstone price', await redstoneAdapter.getLatestPrice());
    console.log('Latest Pyth price', await pythAdapter.getLatestPrice());

    pythAdapter.subscribeToPriceUpdates((priceData) => {
        console.log(`Received an update for Pyth ETH/USD: ${Number(priceData.price) / 10 ** priceData.decimals}`);
    });

    redstoneAdapter.subscribeToPriceUpdates((priceData) => {
        console.log(`Received an update for Redstone ETH/USD: ${Number(priceData.price) / 10 ** priceData.decimals}`);
    });

    console.log('Gas price', await gasPriceService.getGasPrice());
};

const sniff = async () => {
    const lowestPriceForBlock = new Map<bigint, OraclePriceData>();
    const client = createPublicClient({
        transport: webSocket(process.env.RPC_URL),
        chain: sepolia,
    });

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

    const usdnProtocol = new UsdnProtocolContract(client, wallet);
    let lastBlockNumber = await client.getBlockNumber();
    const latestPrice = await pythAdapter.getLatestPrice();
    lowestPriceForBlock.set(lastBlockNumber, latestPrice);
    const startTime = performance.now();

    // TODO improve updating this value
    const consoleTable: { title: string; data: string | number | bigint }[] = [
        { title: '⏲️  Time elapsed', data: '0s' },
        { title: '🔵 Block number', data: lastBlockNumber },
        {
            title: '🟩 Pyth ETH/USD',
            data: Math.floor((Number(latestPrice.price) / 10 ** latestPrice.decimals) * 100) / 100,
        },
        {
            title: '🟥 Positions liquidated',
            data: 0n,
        },
    ];

    console.clear();
    console.table(consoleTable);

    pythAdapter.subscribeToPriceUpdates((priceData) => {
        const lowestPrice = lowestPriceForBlock.get(lastBlockNumber);
        if (lowestPrice === undefined || priceData.price < lowestPrice.price) {
            lowestPriceForBlock.set(lastBlockNumber, priceData);
        }

        consoleTable[2] = {
            title: '🟩 Pyth ETH/USD',
            data: Math.floor((Number(priceData.price) / 10 ** priceData.decimals) * 100) / 100,
        };
        console.clear();
        console.table(consoleTable);
    });

    const unwatch = client.watchBlockNumber({
        onBlockNumber: async (blockNumber) => {
            const lowestPrice = lowestPriceForBlock.get(lastBlockNumber);
            if (lowestPrice) {
                consoleTable[1] = { title: '🔵 Block number', data: lastBlockNumber };
                console.clear();
                console.table(consoleTable);
            } else {
                throw new Error(`Block number: ${lastBlockNumber} - ⚠️⚠️⚠️ Did not receive any prices for this block`);
            }

            const positionsToLiquidate = await usdnProtocol.liquidate(lowestPrice);
            consoleTable[3].data = (consoleTable[3].data as bigint) + positionsToLiquidate.amount;

            if (positionsToLiquidate.amount > 0n) {
                consoleTable.push({
                    title: '🚨 Liquidations',
                    data: `${positionsToLiquidate.amount} to liquidate - Hash: ${positionsToLiquidate.txHash}`,
                });
            }

            lastBlockNumber = blockNumber;
        },
    });

    setInterval(() => {
        consoleTable[0].data = `${Math.floor((performance.now() - startTime) / 1000)}s`;
    }, 1000);

    process.on('SIGINT', () => {
        unwatch();
        client.transport.getRpcClient().then((rpc) => {
            rpc.socket.close();
            console.log('websocket closed');
        });
    });
};

// main();
sniff();
