import type { ViemData } from "./types.ts";

/** Interface for a gas price provider */
export default interface IViem {
  /**
   * Get the gas price for a blockchain transaction
   * @returns The gas price data
   */
  getGasPrice(): Promise<ViemData>;
}
