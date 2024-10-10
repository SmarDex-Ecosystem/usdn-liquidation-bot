import { chainlinkAdapter, pythAdapter, redstoneAdapter } from './adapters/oracles/index.ts';
import { usdnProtocolContract } from './adapters/usdn-protocol/index.ts';
import { gasPriceService } from './services/gas-price/index.ts';
import PendingActionsService from './services/pending-actions/PendingActionsService.ts';
import { getBlockchainClient } from './utils/index.ts';

const main = async () => {
    console.log('Latest Redstone price ', await redstoneAdapter.getLatestPrice());
    console.log('Latest Pyth price     ', await pythAdapter.getLatestPrice());
    console.log('Latest Chainlink price', await chainlinkAdapter.getLatestPrice());

    pythAdapter.subscribeToPriceUpdates((priceData) => {
        console.log(`Received an update for 🟩 Pyth ETH/USD: ${Number(priceData.price) / 10 ** priceData.decimals}`);
    });

    redstoneAdapter.subscribeToPriceUpdates((priceData) => {
        console.log(
            `Received an update for 🟥 Redstone ETH/USD: ${Number(priceData.price) / 10 ** priceData.decimals}`,
        );
    });

    chainlinkAdapter.subscribeToPriceUpdates((priceData) => {
        console.log(
            `Received an update for 🟦 Chainlink ETH/USD: ${Number(priceData.price) / 10 ** priceData.decimals}`,
        );
    });

    console.log('Gas price', await gasPriceService.getGasPrice());
    new PendingActionsService(usdnProtocolContract, getBlockchainClient(), pythAdapter, chainlinkAdapter);
};

main();
