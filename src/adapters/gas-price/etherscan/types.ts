/** EtherscanData type */
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
