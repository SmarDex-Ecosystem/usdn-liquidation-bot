import type { Address } from 'viem';
import { getBlockchainClient, getWalletClient } from '../../utils/index.ts';
import UsdnProtocolContract from './blockchain/UsdnProtocolContract.ts';

export const usdnProtocolContract = new UsdnProtocolContract(
    process.env.USDN_PROTOCOL as Address,
    getBlockchainClient(),
    getWalletClient(),
);
