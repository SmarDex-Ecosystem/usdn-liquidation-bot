import { type Account, type PublicClient, type WalletClient, isAddress } from 'viem';
import type { OraclePriceData } from '../../../oracles/types.ts';
import { IUsdnProtocolAbi } from './abi.ts';
import type IGasPriceAdapter from '../../../gas-price/IGasPriceAdapter.ts';

export default class UsdnProtocolContract {
    private readClient: PublicClient;
    private writeClient: WalletClient;
    private gasPriceAdapter: IGasPriceAdapter;
    private usdnProtocolAddress: `0x${string}`;

    constructor(readClient: PublicClient, writeClient: WalletClient, gasPriceAdapter: IGasPriceAdapter) {
        this.readClient = readClient;
        this.writeClient = writeClient;
        this.gasPriceAdapter = gasPriceAdapter;

        if (!process.env.USDN_PROTOCOL_ADDRESS || !isAddress(process.env.USDN_PROTOCOL_ADDRESS)) {
            throw new Error('Env var USDN_PROTOCOL_ADDRESS is not defined');
        }
        this.usdnProtocolAddress = process.env.USDN_PROTOCOL_ADDRESS;
    }

    async liquidate(priceData: OraclePriceData): Promise<{ txHash: string; amount: bigint }> {
        const { request, result } = await this.readClient.simulateContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            account: this.writeClient.account,
            blockTag: 'pending',
            functionName: 'liquidate',
            args: [`0x${priceData.signature}` as `0x${string}`, 10],
            value: 10n, // should be more than enough to validate the Pyth price
        });

        let hash = '';
        if (result > 0n) {
            const gasPrice = await this.gasPriceAdapter.getGasPrice();
            request.maxFeePerGas = gasPrice.suggestedBaseFee;
            request.maxPriorityFeePerGas = gasPrice.fastPriorityFee;

            hash = await this.writeClient.writeContract(request);
        }

        return {
            amount: result,
            txHash: hash,
        };
    }

    async getActionablePendingActions() {
        return this.readClient.readContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            blockTag: 'pending',
            functionName: 'getActionablePendingActions',
            args: ['0x0000000000000000000000000000000000000000'],
        });
    }

    async validateActionablePendingActions(priceData: readonly `0x${string}`[], rawIndices: readonly bigint[]) {
        const { request, result } = await this.readClient.simulateContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            blockTag: 'pending',
            account: this.writeClient.account as Account,
            functionName: 'validateActionablePendingActions',
            args: [
                {
                    priceData,
                    rawIndices,
                },
                BigInt(rawIndices.length),
            ],
        });

        let hash = '';
        if (result > 0n) {
            const gasPrice = await this.gasPriceAdapter.getGasPrice();
            request.maxFeePerGas = gasPrice.suggestedBaseFee;
            request.maxPriorityFeePerGas = gasPrice.fastPriorityFee;

            hash = await this.writeClient.writeContract(request);
        }

        return {
            amount: result,
            txHash: hash,
        };
    }
}
