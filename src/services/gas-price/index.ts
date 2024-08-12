import Etherscan from '../../adapters/gas-price/etherscan/Etherscan.ts';
import Viem from '../../adapters/gas-price/viem/Viem.ts';
import { newClient } from '../../utils/index.ts';
import GasPriceService from './GasPriceService.ts';
import type IGasPriceService from './IGasPriceService.ts';

export const gasPriceService: IGasPriceService = new GasPriceService(
    new Etherscan(process.env.ETHERSCAN_API_KEY || ''),
    new Viem(await newClient()),
);
