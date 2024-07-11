export type RedstonePrice = {
    price: bigint,
    decimals: number,
    signature: string
}

export class RedstonePriceFetchingError extends Error {}