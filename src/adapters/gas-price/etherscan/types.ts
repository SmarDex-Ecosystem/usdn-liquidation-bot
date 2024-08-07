/** Gas price depending on how fast the TX should be mined */
export type EtherscanData = {
  status: string;
  message: string;
  result: {
    LastBlock: number;
    SafeGasPrice: number;
    ProposeGasPrice: number;
    FastGasPrice: number;
    suggestBaseFee: number;
    gasUsedRatio: string;
  };
};
