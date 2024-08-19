import { isAddress, type PublicClient, type WalletClient } from 'viem';
import type { OraclePriceData } from '../../../oracles/types.ts';
import { IUsdnProtocolAbi } from './abi.ts';

export default class UsdnProtocolContract {
    private readClient: PublicClient;
    private writeClient: WalletClient;
    private usdnProtocolAddress: `0x${string}`;

    constructor(readClient: PublicClient, writeClient: WalletClient) {
        this.readClient = readClient;
        this.writeClient = writeClient;

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
            hash = await this.writeClient.writeContract(request);
        }

        return {
            amount: result,
            txHash: hash,
        };
    }
}
