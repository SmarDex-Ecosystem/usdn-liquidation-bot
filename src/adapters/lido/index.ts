import { getBlockchainClient } from '../../utils/index.ts';
import LidoContract from './blockchain/LidoContract.ts';

export const lidoContract = new LidoContract(getBlockchainClient(), process.env.WSTETH as `0x${string}`);
