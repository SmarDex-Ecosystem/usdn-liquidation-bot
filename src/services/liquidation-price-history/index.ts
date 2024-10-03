import { pythAdapter } from '../../adapters/oracles/index.ts';
import LiquidationPriceHistory from './LiquidationPriceHistory.ts';

export const liquidationPriceHistory = new LiquidationPriceHistory(pythAdapter);
