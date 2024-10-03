import type { Address } from 'viem';
import { getBlockchainClient } from '../../utils/index.ts';
import WstETHContract from './wst-eth/WstETHContract.ts';

export const wstETHContract = new WstETHContract(getBlockchainClient(), process.env.WSTETH as Address);
