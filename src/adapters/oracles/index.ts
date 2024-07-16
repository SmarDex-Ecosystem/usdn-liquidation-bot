import type IOracleAdapter from './IOracleAdapter.js';
import RedstoneAdapter from './redstone-adapter/RedstoneAdapter.js';
import PythAdapter from './pyth-adapter/PythAdapter.js';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
