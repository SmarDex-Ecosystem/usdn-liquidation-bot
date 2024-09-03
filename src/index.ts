import type { Hash, TransactionReceipt, WalletActions, PublicActions, TestClient } from 'viem';
import { http, createTestClient, defineChain, publicActions, walletActions, parseEther, stringToHex } from 'viem';
import Viem from './adapters/gas-price/viem/Viem.ts';
import { privateKeyToAccount } from 'viem/accounts';
import { UsdnProtocolContract } from './adapters/blockchain/usdn/contract/UsdnProtocolContract.ts';
import { MockMiddlewareContract } from './adapters/oracles/MockWstEthOracleMiddleware.ts';
import { MockWstethContract } from "./adapters/blockchain/wsteth/contract/MockWstethContract.ts";
import { MockSdexContract } from "./adapters/blockchain/sdex/contract/MockSdexContract.ts";


/* ---------------------------------- data ---------------------------------- */

const initialPrice = parseEther("3000");
let txHash: Hash = stringToHex("", {size: 0});


/* --------------------------- create test client --------------------------- */

export const fork = defineChain({
    id: 31337,
    network: 'homestead',
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: {
        http: [process.env.RPC_HTTP_URL || "http://127.0.0.1:8545"],
      },
      public: {
        http: [process.env.RPC_HTTP_URL || "http://127.0.0.1:8545"],
      },
    },
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const client: any = createTestClient({
    chain: fork,
    mode: "anvil",
    transport: http(),
}).extend(publicActions)
.extend(walletActions);


/* --------------------------- instantiate class -------------------------- */

const gasPriceAdapter = new Viem(client as TestClient & WalletActions & PublicActions);
const usdnProtocolContract = new UsdnProtocolContract(client as TestClient & WalletActions & PublicActions, gasPriceAdapter);
const mockMiddlewareContract = new MockMiddlewareContract(client as TestClient & WalletActions & PublicActions);
const mockWstethContract = new MockWstethContract(client as TestClient & WalletActions & PublicActions);
const mockSdexContract = new MockSdexContract(client as TestClient & WalletActions & PublicActions);


/* --------------------------- private keys check  -------------------------- */

let privateKeys: string | undefined | Hash[] = process.env.PRIVATE_KEYS;
if (!privateKeys) {
    throw new Error('Env var PRIVATE_KEYS is not defined');
}

privateKeys = JSON.parse(privateKeys);

if (!privateKeys || privateKeys?.length === 0) {
    throw new Error('Env var PRIVATE_KEYS is not valid');
}


/* --------------------------- helpers  -------------------------- */

const openPositions = async() => {
    if(privateKeys.length === 0) {
        throw new Error("Accounts are not set");
    }

    for await(const privateKey of privateKeys) {
        const account = privateKeyToAccount(privateKey as Hash);
        const baseAmount = parseEther("10000");
        
        // mint and approve wsteth
        txHash = await mockWstethContract.mint(account.address, baseAmount, account);
        await waitForConfirmation(txHash);
        txHash = await mockWstethContract.approveMax(usdnProtocolContract.usdnProtocolAddress, account);
        await waitForConfirmation(txHash);
        console.log("wsteth approved");

        // initiate position
        const initiateData = await usdnProtocolContract.initiateRandomOpen(parseEther("2"), initialPrice, account);
        txHash = initiateData.txHash as Hash;
        const timestamp = (await client.getBlock()).timestamp
        await waitForConfirmation(txHash);
        await client.setNextBlockTimestamp({
            timestamp: BigInt(timestamp) + 25n
        });
        console.log("initiate done");

        await client.mine({blocks: 1});

        // validate position
        const validateData = await usdnProtocolContract.validateOpenHelper(account);
        txHash = validateData.txHash as Hash;
        await waitForConfirmation(txHash);
        console.log("validate done");
        console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    } 
}

const setPrice = async(price: bigint): Promise<void> => {
    if(privateKeys.length > 0) {
        const account = privateKeyToAccount(privateKeys[0] as Hash);
        const hash = await mockMiddlewareContract.setWstethMockedPrice(price, account);
        await waitForConfirmation(hash);
    } else {
        throw new Error("Accounts are not set");
    }
}

const setSignature = async(verify: boolean): Promise<void> => {
    if(privateKeys.length > 0) {
        const account = privateKeyToAccount(privateKeys[0] as Hash);
        const hash = await mockMiddlewareContract.setVerifySignature(verify, account);
        await waitForConfirmation(hash);
    } else {
        throw new Error("Accounts are not set");
    }
}

const setMining = async() => {
    await client.mine({ blocks: 1} );
    await client.setAutomine(false);
    await client.setIntervalMining({ interval: 1 });
    await client.mine({ blocks: 1} );
}

const waitForConfirmation = async(hash: Hash): Promise<TransactionReceipt> => {
    await client.mine({blocks: 1});
    const receipt = await client.waitForTransactionReceipt({hash});
    if(receipt.status !== "success") {
        throw new Error("Transaction error");
    }

    return receipt;
}

const liquidate = async (blockNumber: bigint) => {
    const positionsLiquidated = await usdnProtocolContract.liquidate(privateKeyToAccount(privateKeys[0] as Hash));
    if (positionsLiquidated.amount > 0) {
        console.log(
            `🚨 Liquidations - ${positionsLiquidated.amount} liquidated - Hash: ${positionsLiquidated.txHash}`,
        );
    } else {
        console.log("🚨 Nothing liquidated !!!!");
    }
};


/* --------------------------- execution  -------------------------- */

(async () => {
    await setPrice(initialPrice);
    await setSignature(false);
    await openPositions();
    await waitForConfirmation(txHash);
    await setPrice(initialPrice / 100n);
    await setMining();
})();

const unwatch = client.watchBlockNumber({
    onBlockNumber: (blockNumber: bigint) => {
        console.log(`🔵 Block number ${blockNumber} at ${new Date().toISOString()}`);
        liquidate(blockNumber);
        console.log('------------------------------------ - -----------------------------------');
    },
    
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onError(error: any) {
        throw new Error(`Cannot continue watching block numbers: ${error}`);
    },
});


/* ---------------------------- Graceful Shutdown --------------------------- */

process.on('SIGINT', () => {
    unwatch();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    client.transport.getRpcClient().then((rpc: any) => {
        rpc.socket.close();
        console.log('Viem websocket closed');
    });
});

process.on('SIGTERM', () => {
    unwatch();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    client.transport.getRpcClient().then((rpc: any) => {
        rpc.socket.close();
        console.log('Viem websocket closed');
    });
});


