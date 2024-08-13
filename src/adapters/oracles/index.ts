import { client } from '../../utils/blockchainClient/index.ts';
import type IOracleAdapter from './IOracleAdapter.ts';
import ChainlinkAdapter from './chainlink/ChainlinkAdapter.ts';
import ChainlinkPriceFeedContract from './chainlink/blockchain/ChainlinkPriceFeedContract.ts';
import PythAdapter from './pyth/PythAdapter.ts';
import RedstoneAdapter from './redstone/RedstoneAdapter.ts';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
export const chainlinkAdapter: IOracleAdapter = new ChainlinkAdapter(new ChainlinkPriceFeedContract(client));
