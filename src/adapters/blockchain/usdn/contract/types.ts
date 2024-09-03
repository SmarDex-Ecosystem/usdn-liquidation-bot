import type {Hash} from "viem";

// biome-ignore lint/style/useEnumInitializers: <explanation>
export enum ProtocolAction {
    None,
    Initialize,
    InitiateDeposit,
    ValidateDeposit,
    InitiateWithdrawal,
    ValidateWithdrawal,
    InitiateOpenPosition,
    ValidateOpenPosition,
    InitiateClosePosition,
    ValidateClosePosition,
    Liquidation
}

export type PreviousActionsData = {
    priceData: Hash[];
    rawIndices: bigint[];
}

export type  InitiateOpenResultData = readonly [ boolean, PosId ];

export type PosId = { 
    tick: number; 
    tickVersion: bigint; 
    index: bigint; 
}