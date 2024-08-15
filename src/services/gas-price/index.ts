import type IGasPriceAdapter from '../../adapters/gas-price/IGasPriceAdapter.ts';
import Etherscan from '../../adapters/gas-price/etherscan/Etherscan.ts';
import Viem from '../../adapters/gas-price/viem/Viem.ts';
import { getBlockchainClient } from '../../utils/index.ts';
import GasPriceService from './GasPriceService.ts';

export const gasPriceService: IGasPriceAdapter = new GasPriceService(
    new Etherscan(process.env.ETHERSCAN_API_KEY || ''),
    new Viem(await getBlockchainClient()),
);
