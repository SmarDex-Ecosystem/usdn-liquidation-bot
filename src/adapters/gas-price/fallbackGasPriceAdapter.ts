import type IViem from "../../adapters/gas-price/viem/IViem.ts";
import type IGasPricedAdapter from "./IGasPricedAdapter.ts";

export default class FallbackGasPriceAdapter implements IGasPricedAdapter {
  private viem: IViem;

  constructor(viem: IViem) {
    this.viem = viem;
  }

  /** @inheritdoc */
  public async getGasPrice() {
    const viemResult = await this.viem.getGasPrice();
    return {
      average: viemResult.average,
      high: viemResult.high,
      baseFee: 0n,
    };
  }
}
