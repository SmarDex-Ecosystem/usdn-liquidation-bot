import { newClient } from '../../utils/index.ts';
import LidoContract from './blockchain/LidoContract.ts';

export const lidoContract = new LidoContract(await newClient(), process.env.WSTETH as `0x${string}`);
