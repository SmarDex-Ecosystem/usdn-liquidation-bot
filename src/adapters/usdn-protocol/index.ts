import { newClient } from "../../utils/index.ts";
import UsdnProtocolContract from "./blockchain/Contract.ts";
import type IContract from "./blockchain/IContract.ts";

export const usdnProtocolContract: IContract = new UsdnProtocolContract(
  await newClient(),
  process.env.USDN_PROTOCOL || ""
);
