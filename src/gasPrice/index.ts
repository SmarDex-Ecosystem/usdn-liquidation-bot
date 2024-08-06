import { newClient } from '../utils/index.ts';
import GasPrice from './GasPrice.js';
import type IGasPrice from './IGasPrice.js';

export const gasPrice: IGasPrice = new GasPrice(await newClient());
