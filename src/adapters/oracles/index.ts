import type IOracleAdapter from './IOracleAdapter.ts';
import RedstoneAdapter from './redstone-adapter/RedstoneAdapter.ts';
import PythAdapter from './pyth-adapter/PythAdapter.ts';

export const redstoneAdapter: IOracleAdapter = new RedstoneAdapter();
export const pythAdapter: IOracleAdapter = new PythAdapter();
