import Etherscan from '../../adapters/gas-price/etherscan/Etherscan.ts';
import Viem from '../../adapters/gas-price/viem/Viem.ts';
import { newClient } from '../../utils/index.ts';
import GasPriceService from './GasPriceService.ts';
import type IGasPriceService from './IGasPriceService.ts';

const viemInstance = new Viem(await newClient());
const etherscanInstance = new Etherscan(process.env.ETHERSCAN_API_KEY || '');

export const gasPriceService: IGasPriceService = new GasPriceService(viemInstance, etherscanInstance);
