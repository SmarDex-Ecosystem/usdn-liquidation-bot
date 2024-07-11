import { RedstonePrice } from "./types.js";

export default interface IRedstoneAdapter {
    getLatestPrice(): Promise<RedstonePrice>;
}