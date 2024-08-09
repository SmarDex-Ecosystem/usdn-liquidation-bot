import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";
import FallbackGasPriceAdapter from "../../adapters/gas-price/fallbackGasPriceAdapter.ts";
import PrimaryGasPriceAdapter from "../../adapters/gas-price/primaryGasPriceAdapter.ts";
import Viem from "../../adapters/gas-price/viem/Viem.ts";
import { newClient } from "../../utils/index.ts";
import GasPriceService from "./GasPriceService.ts";
import type IGasPriceService from "./IGasPriceService.ts";

const PrimaryGasPriceInstance = new PrimaryGasPriceAdapter(
  new Etherscan(process.env.ETHERSCAN_API_KEY || "")
);
const FallbackGasPriceInstance = new FallbackGasPriceAdapter(
  new Viem(await newClient())
);

export const gasPriceService: IGasPriceService = new GasPriceService(
  PrimaryGasPriceInstance,
  FallbackGasPriceInstance
);
