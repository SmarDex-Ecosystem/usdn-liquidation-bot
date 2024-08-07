import Viem from "../../adapters/gas-price/viem/Viem.ts";
import type IViem from "../../adapters/gas-price/viem/IViem.ts";
import { newClient } from "../../utils/index.ts";
import type IEtherscan from "../../adapters/gas-price/etherscan/IEtherscan.ts";
import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";
import type IGasPriceService from "./IGasPriceService.ts";

class GasPriceService implements IGasPriceService {
  private etherscan: IEtherscan;
  private viem!: IViem;

  constructor() {
    const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "";
    this.etherscan = new Etherscan(etherscanApiKey);
    this.initializeViem();
  }

  private async initializeViem(): Promise<void> {
    try {
      const client = await newClient();
      this.viem = new Viem(client);
    } catch (error) {
      console.error("Error initializing Viem:", error);
      throw new Error("Failed to initialize Viem client.");
    }
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
      const viemResult = await this.viem.getGasPrice();
      return {
        average: viemResult.average,
        high: viemResult.high,
        baseFee: 0n,
      };
    }
  }
}

const gasPriceService = new GasPriceService();

export default gasPriceService;
