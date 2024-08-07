import type { GasPriceServiceData } from "./types.ts";

/** Interface for a gas price service */
export default interface IGasPriceService {
  /**
   * Get the gas price for a blockchain transaction
   * @returns The gas price data (in wei)
   */
  getGasPrice(): Promise<GasPriceServiceData>;
}
