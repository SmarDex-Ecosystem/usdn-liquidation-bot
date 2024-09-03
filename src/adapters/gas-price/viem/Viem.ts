import type { TestClient, WalletActions, PublicActions} from 'viem';
import type IGasPriceAdapter from '../IGasPriceAdapter.ts';
export default class Viem implements IGasPriceAdapter {
    private client: TestClient & WalletActions & PublicActions;

    constructor(getBlockchainClient: TestClient & WalletActions & PublicActions) {
        this.client = getBlockchainClient;
    }

    /** @inheritDoc */
    async getGasPrice() {
        const gasPrice = await this.client.estimateFeesPerGas();

        return {
            fastPriorityFee: gasPrice.maxPriorityFeePerGas,
            suggestedBaseFee: gasPrice.maxFeePerGas,
        };
    }
}
