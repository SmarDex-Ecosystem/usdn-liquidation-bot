import { chainlinkAdapter, pythAdapter, redstoneAdapter } from './adapters/oracles/index.ts';

const helloWorld = async () => {
    console.log('redstone', await redstoneAdapter.getLatestPrice());
    console.log('pyth', await pythAdapter.getLatestPrice());
    console.log('chainlink', await chainlinkAdapter.getLatestPrice());

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

    return 'Hello, World!';
};

helloWorld();
