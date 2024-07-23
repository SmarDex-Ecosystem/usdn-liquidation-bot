import type IGasPrice from "./IGasPrice.js";
import { GasPriceFetchingError } from "./types.js";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export default class GasPrice implements IGasPrice {
  publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  /** @inheritDoc */
  async getGasPrice() {
    const gasPrice = await this.publicClient.getGasPrice();
    if (!gasPrice) {
      throw new GasPriceFetchingError();
    }

    return {
      average: gasPrice,
      high: gasPrice * BigInt(2),
    };
  }
}
