import type { PublicClient } from "viem";
import type IViem from "./IViem.ts";

export default class Viem implements IViem {
  private client: PublicClient;

  constructor(newClient: PublicClient) {
    this.client = newClient;
  }

  /** @inheritDoc */
  async getGasPrice() {
    const gasPrice = await this.client.getGasPrice();

    return {
      average: gasPrice,
      high: gasPrice * BigInt(2),
    };
  }
}
