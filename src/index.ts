import RedstoneAdapter from "./adapters/oracles/redstone-adapter/RedstoneAdapter.js";
import GasPrice from "./gasPrice/GasPrice.js";

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

async function main() {
  const redstoneAdapter = new RedstoneAdapter();
  const gasPrice = new GasPrice();
  await getPriceAndLog(redstoneAdapter);
  await getGasPriceAndLog(gasPrice);
  setInterval(() => {
    getPriceAndLog(redstoneAdapter);
    getGasPriceAndLog(gasPrice);
  }, 5000);
}

main();
