import { newClient } from "../../utils/index.ts";
import UsdnProtocolContract from "./blockchain/UsdnProtocolContract.ts";
import type IUsdnProtocolContract from "./blockchain/UsdnProtocolContract.ts";

export const usdnProtocolContract: IUsdnProtocolContract =
  new UsdnProtocolContract(
    await newClient(),
    process.env.USDN_PROTOCOL as `0x${string}`
  );
