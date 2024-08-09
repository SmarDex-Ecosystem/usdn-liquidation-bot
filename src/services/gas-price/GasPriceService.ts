import type IEtherscan from '../../adapters/gas-price/etherscan/IEtherscan.ts';
import type IViem from '../../adapters/gas-price/viem/IViem.ts';
import type IGasPriceService from './IGasPriceService.ts';

export default class GasPriceService implements IGasPriceService {
    private viem: IViem;
    private etherscan: IEtherscan;

    constructor(viem: IViem, etherscan: IEtherscan) {
        this.viem = viem;
        this.etherscan = etherscan;
    }

    /** @inheritdoc */
    public async getGasPrice() {
        try {
            const etherscanResult = await this.etherscan.getGasPrice();
            return {
                average: BigInt(etherscanResult.result.SafeGasPrice) * BigInt(1000000000),
                high: BigInt(etherscanResult.result.FastGasPrice) * BigInt(1000000000),
                baseFee:
                    BigInt(Math.ceil(Number.parseFloat(etherscanResult.result.suggestBaseFee.toString())).toString()) *
                    BigInt(1000000000),
            };
        } catch {
            const viemResult = await this.viem.getGasPrice();
            return {
                average: viemResult.average,
                high: viemResult.high,
                baseFee: 0n,
            };
        }
    }
}
