import type IOracleAdapter from './IOracleAdapter.ts';
import RedstoneAdapter from './redstone/RedstoneAdapter.ts';
import PythAdapter from './pyth/PythAdapter.ts';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
