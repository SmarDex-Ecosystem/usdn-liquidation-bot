import { pythAdapter, redstoneAdapter } from './adapters/oracles/index.ts';
import gasPriceService from './services/gas-price/GasPriceService.ts';

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

main();
