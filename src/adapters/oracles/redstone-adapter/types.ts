/** Price data from the Redstone oracle */
export type RedstonePriceData = {
    price: bigint;
    /** The number of decimals the price has */
    decimals: number;
    /** The signature that can be used to verify the price during an on-chain call */
    signature: string;
};

/** Error indicating that the response from the Redstone oracle does not contain the necessary information */
export class RedstonePriceFetchingError extends Error {}
