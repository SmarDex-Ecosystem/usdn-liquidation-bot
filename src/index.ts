import { pythAdapter, redstoneAdapter } from "./adapters/oracles/index.ts";

async function getPriceAndLog(redstoneAdapter: RedstoneAdapter) {
  try {
    const data = await redstoneAdapter.getLatestPrice();
    console.log(data);
  } catch (error) {
    console.error("Error fetching the latest price:", error);
  }
}

async function getGasPriceAndLog(gasPrice: GasPrice) {
  try {
    const data = await gasPrice.getGasPrice();
    console.log(data);
  } catch (error) {
    console.error("Error fetching the gas price:", error);
  }
}

const main = async () => {
  console.log("Latest Redstone price", await redstoneAdapter.getLatestPrice());
  console.log("Latest Pyth price", await pythAdapter.getLatestPrice());

  pythAdapter.subscribeToPriceUpdates((priceData) => {
    console.log(
      `Received an update for Pyth ETH/USD: ${
        Number(priceData.price) / 10 ** priceData.decimals
      }`
    );
  });

  redstoneAdapter.subscribeToPriceUpdates((priceData) => {
    console.log(
      `Received an update for Redstone ETH/USD: ${
        Number(priceData.price) / 10 ** priceData.decimals
      }`
    );
  });

  const redstoneAdapter = new RedstoneAdapter();
  const gasPrice = new GasPrice();
  await getPriceAndLog(redstoneAdapter);
  await getGasPriceAndLog(gasPrice);
  setInterval(() => {
    getPriceAndLog(redstoneAdapter);
    getGasPriceAndLog(gasPrice);
  }, 5000);
};

main();
