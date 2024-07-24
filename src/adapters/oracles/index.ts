import type IOracleAdapter from './IOracleAdapter.ts';
import PythAdapter from './pyth/PythAdapter.ts';
import RedstoneAdapter from './redstone/RedstoneAdapter.ts';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
