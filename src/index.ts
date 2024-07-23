import RedstoneAdapter from "./adapters/oracles/redstone-adapter/RedstoneAdapter.js";

async function getPriceAndLog(redstoneAdapter: RedstoneAdapter) {
  try {
    const data = await redstoneAdapter.getLatestPrice();
    console.log(data);
  } catch (error) {
    console.error("Error fetching the latest price:", error);
  }
}

async function main() {
  const redstoneAdapter = new RedstoneAdapter();
  await getPriceAndLog(redstoneAdapter);
  setInterval(() => {
    getPriceAndLog(redstoneAdapter);
  }, 5000);
}

main();
