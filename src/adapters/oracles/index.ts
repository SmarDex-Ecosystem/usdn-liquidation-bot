import type IOracleAdapter from './IOracleAdapter.ts';
import PythAdapter from './pyth-adapter/PythAdapter.ts';
import RedstoneAdapter from './redstone-adapter/RedstoneAdapter.ts';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
