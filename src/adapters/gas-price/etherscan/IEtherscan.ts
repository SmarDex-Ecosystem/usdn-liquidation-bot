import type { EtherscanData } from "./types.ts";

/** Interface for a gas price etherscan provider */
export default interface IEtherscan {
  /**
   * Get the gas price for a blockchain transaction
   * @returns The gas price data
   */
  getGasPrice(): Promise<EtherscanData>;
}
