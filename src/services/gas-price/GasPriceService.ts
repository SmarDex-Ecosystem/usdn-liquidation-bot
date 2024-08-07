import Viem from "../../adapters/gas-price/viem/Viem.ts";
import type IViem from "../../adapters/gas-price/viem/IViem.ts";
import { newClient } from "../../utils/index.ts";
import type IEtherscan from "../../adapters/gas-price/etherscan/IEtherscan.ts";
import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";

class GasPriceService {
  private etherscan: IEtherscan;
  private viem?: IViem;

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

  public async getGasPrice() {
    try {
      return await this.etherscan.getGasPrice();
    } catch {
      if (this.viem) {
        return await this.viem.getGasPrice();
      }
      throw new Error("Viem is not initialized. Unable to retrieve gas price.");
    }
  }
}

const gasPriceService = new GasPriceService();

export default gasPriceService;
