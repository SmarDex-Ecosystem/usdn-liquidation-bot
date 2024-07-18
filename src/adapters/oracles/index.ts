import type IOracleAdapter from './IOracleAdapter.js';
import RedstoneAdapter from './redstone/RedstoneAdapter.js';
import PythAdapter from './pyth/PythAdapter.js';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
