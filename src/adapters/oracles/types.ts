/**
 * Price data from an oracle
 * @param price The price (to be divided by `decimals`)
 * @param decimals The number of decimals the price has
 * @param signature The signature that can be used to verify the price during an on-chain call
 */
export type OraclePriceData = {
    price: bigint;
    decimals: number;
    signature: string;
};

/** Callback that will be executed whenever the oracle update its price */
export type OraclePriceUpdateCallback = (priceData: OraclePriceData) => void;

/** Error indicating that the response from the oracle does not contain the necessary information */
export class OraclePriceFetchingError extends Error {}
