import { getBlockchainClient } from '../../utils/index.ts';
import WstETHContract from './blockchain/WstETHContract.ts';

export const wstETHContract = new WstETHContract(getBlockchainClient(), process.env.WSTETH as `0x${string}`);
