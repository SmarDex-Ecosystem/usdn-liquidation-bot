import { mainnet, sepolia } from 'viem/chains';
import Etherscan from '../../adapters/gas-price/etherscan/Etherscan.ts';
import Viem from '../../adapters/gas-price/viem/Viem.ts';
import { getBlockchainClient } from '../../utils/index.ts';
import GasPriceService from './GasPriceService.ts';
import type IGasPriceAdapter from '../../adapters/gas-price/IGasPriceAdapter.ts';
import Beaconchain from '../../adapters/gas-price/beaconchain/Beaconchain.ts';

const blockChainClient = getBlockchainClient();
const chainId = await blockChainClient.getChainId();

let primaryGasAdapter: IGasPriceAdapter;
switch (chainId) {
    case mainnet.id:
        primaryGasAdapter = new Etherscan(process.env.ETHERSCAN_API_KEY || '');
        break;
    case sepolia.id:
        primaryGasAdapter = new Beaconchain();
        break;
    default:
        throw new Error(`Unsupported chain ID ${chainId}`);
}

export const gasPriceService = new GasPriceService(primaryGasAdapter, new Viem(getBlockchainClient()));
