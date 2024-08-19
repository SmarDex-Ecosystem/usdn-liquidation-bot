import { getBlockchainClient } from '../../utils/index.ts';
import UsdnProtocolContract from './blockchain/UsdnProtocolContract.ts';

export const usdnProtocolContract = new UsdnProtocolContract(
    getBlockchainClient(),
    process.env.USDN_PROTOCOL as `0x${string}`,
);
