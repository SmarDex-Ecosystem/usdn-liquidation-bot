import { getBlockchainClient } from '../../utils/index.ts';
import ChainlinkAdapter from './chainlink/ChainlinkAdapter.ts';
import ChainlinkPriceFeedContract from './chainlink/blockchain/ChainlinkPriceFeedContract.ts';
import PythAdapter from './pyth/PythAdapter.ts';
import RedstoneAdapter from './redstone/RedstoneAdapter.ts';

export const redstoneAdapter = new RedstoneAdapter();
export const pythAdapter = new PythAdapter();
export const chainlinkAdapter = new ChainlinkAdapter(new ChainlinkPriceFeedContract(getBlockchainClient()));
