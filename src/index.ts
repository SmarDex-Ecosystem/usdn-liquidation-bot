import { pythAdapter, redstoneAdapter } from './adapters/oracles/index.js';

const helloWorld = async () => {
    console.log('redstone', await redstoneAdapter.getLatestPrice());
    console.log('pyth', await pythAdapter.getLatestPrice());

    pythAdapter.subscribeToPriceUpdate((priceData) => {
        console.log(`Received an update for Pyth ETH/USD: ${Number(priceData.price) / 10 ** priceData.decimals}`);
    });

    return 'Hello, World!';
};

helloWorld();
