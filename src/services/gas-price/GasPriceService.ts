import Viem from "../../adapters/gas-price/viem/Viem.ts";
import type IViem from "../../adapters/gas-price/viem/IViem.ts";
import { newClient } from "../../utils/index.ts";

export const viem: IViem = new Viem(await newClient());
