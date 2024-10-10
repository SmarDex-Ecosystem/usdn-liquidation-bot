import type { Address } from 'viem';
import { getBlockchainClient } from '../../utils/index.ts';
import UsdnProtocolContract from './blockchain/UsdnProtocolContract.ts';
import { gasPriceService } from '../../services/gas-price/index.ts';

const blockChainClient = getBlockchainClient().extend((client) => ({
    async writeContract(args) {
        const gasPrice = await gasPriceService.getGasPrice();
        args.maxFeePerGas = gasPrice.suggestedBaseFee;
        args.maxPriorityFeePerGas = gasPrice.fastPriorityFee;

        return client.writeContract(args);
    },
}));

export const usdnProtocolContract = new UsdnProtocolContract(process.env.USDN_PROTOCOL as Address, blockChainClient);
