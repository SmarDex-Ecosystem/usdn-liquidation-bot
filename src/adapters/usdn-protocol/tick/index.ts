import { newClient } from '../../../utils/index.ts';
import GetHighestPopulatedTick from './GetHighestPopulatedTick.ts';
import type IGetHighestPopulatedTick from './IGetHighestPopulatedTick.ts';

export const getHighestPopulatedTickAdapter: IGetHighestPopulatedTick = new GetHighestPopulatedTick(
    await newClient(),
    process.env.USDN_PROTOCOL || '',
);
