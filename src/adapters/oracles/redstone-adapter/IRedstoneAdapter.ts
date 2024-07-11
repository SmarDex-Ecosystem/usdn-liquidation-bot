import { RedstonePriceData } from "./types.js";

/** Allow to communicate with the Redstone oracle */
export default interface IRedstoneAdapter {
    /**
     * Get the latest price and its signature from Redstone
     * @returns The latest price and its signature
     */
    getLatestPrice(): Promise<RedstonePriceData>;
}