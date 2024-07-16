/** Price data from an oracle */
export type OraclePriceData = {
    price: bigint;
    /** The number of decimals the price has */
    decimals: number;
    /** The signature that can be used to verify the price during an on-chain call */
    signature: string;
};

/** Callback that will be executed whenever the oracle update its price */
export type OraclePriceUpdateCallback = (priceData: OraclePriceData) => void;

/** Error indicating that the response from the oracle does not contain the necessary information */
export class OraclePriceFetchingError extends Error {}
