/** Gas price depending on how fast the TX should be mined */
export type GasPriceData = {
    average: bigint;
    high: bigint;
};

/** Error indicating that the response from the RPC does not contain the necessary information */
export class GasPriceFetchingError extends Error {}
