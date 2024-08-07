import Viem from "../../adapters/gas-price/viem/Viem.ts";
import type IViem from "../../adapters/gas-price/viem/IViem.ts";
import { newClient } from "../../utils/index.ts";
import type IEtherscan from "../../adapters/gas-price/etherscan/IEtherscan.ts";
import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";

export const viem: IViem = new Viem(await newClient());
export const etherscan: IEtherscan = new Etherscan(
  process.env.ETHERSCAN_API_KEY || ""
);
