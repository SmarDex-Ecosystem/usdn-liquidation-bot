import type IEtherscan from "../../adapters/gas-price/etherscan/IEtherscan.ts";
import type IGasPricedAdapter from "./IGasPricedAdapter.ts";

export default class PrimaryGasPriceAdapter implements IGasPricedAdapter {
  private etherscan: IEtherscan;

  constructor(etherscan: IEtherscan) {
    this.etherscan = etherscan;
  }

  /** @inheritdoc */
  public async getGasPrice() {
    try {
      const etherscanResult = await this.etherscan.getGasPrice();
      return {
        average:
          BigInt(etherscanResult.result.SafeGasPrice) * BigInt(1000000000),
        high: BigInt(etherscanResult.result.FastGasPrice) * BigInt(1000000000),
        baseFee:
          BigInt(
            Math.ceil(
              Number.parseFloat(
                etherscanResult.result.suggestBaseFee.toString()
              )
            ).toString()
          ) * BigInt(1000000000),
      };
    } catch {
      throw new Error("Error retrieving gas price from Etherscan");
    }
  }
}
