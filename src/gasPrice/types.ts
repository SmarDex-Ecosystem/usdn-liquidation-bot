/** Price data from the RPC */
export type GasPriceData = {
    average: bigint;
    high: bigint;
};

/** Error indicating that the response from the RPC does not contain the necessary information */
export class GasPriceFetchingError extends Error {}
