import axios from "axios";
import type IEtherscan from "./IEtherscan.ts";
import type { EtherscanData } from "./types.ts";

export default class Etherscan implements IEtherscan {
  private apiKeyToken: string | null = null;

  constructor(YourApiKeyToken: string) {
    this.apiKeyToken = YourApiKeyToken;
  }

  /** @inheritDoc */
  async getGasPrice() {
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${this.apiKeyToken}`;
    const response = await axios.get<EtherscanData>(url);

    if (response.data.status !== "1") {
      throw new Error(
        `Error fetching gas oracle data: ${response.data.message}`
      );
    }

    return response.data.result;
  }
}
