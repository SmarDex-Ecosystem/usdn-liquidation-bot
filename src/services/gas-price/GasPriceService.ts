import Viem from "../../adapters/gas-price/viem/Viem.ts";
import type IViem from "../../adapters/gas-price/viem/IViem.ts";
import { newClient } from "../../utils/index.ts";
import type IEtherscan from "../../adapters/gas-price/etherscan/IEtherscan.ts";
import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";

export const viem: IViem = new Viem(await newClient());
export const etherscan: IEtherscan = new Etherscan(
  process.env.ETHERSCAN_API_KEY || ""
);

class GasPriceService {
  private etherscan: IEtherscan;
  private viem: IViem | undefined;

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
      console.error("Erreur lors de l'initialisation de Viem:", error);
      throw new Error("Impossible d'initialiser le client Viem.");
    }
  }

  public async getGasPrice() {
    try {
      return etherscan.getGasPrice();
    } catch {
      return viem.getGasPrice();
    }
  }
}

// Création d'une instance unique de GasPriceService
const gasPriceService = new GasPriceService();

export default gasPriceService;
