import { type TestClient, type WalletActions, type PublicActions, isAddress, type Hash, type Account, maxUint256} from 'viem';
import { IMockSdexAbi } from './abi.ts';

export class MockSdexContract {
    private client: TestClient & WalletActions & PublicActions;
    private sdexAddress: Hash;

    constructor(client: TestClient & WalletActions & PublicActions) {
        this.client = client;

        if (!process.env.MOCK_SDEX_ADDRESS || !isAddress(process.env.MOCK_SDEX_ADDRESS)) {
            throw new Error('Env var MOCK_SDEX_ADDRESS is not defined');
        }

        this.sdexAddress = process.env.MOCK_SDEX_ADDRESS;
    }

    async mintAndApprove(to: Hash, amount: bigint, target: Hash, account: Account):Promise<Hash>{
        const { request } = await this.client.simulateContract({
            abi: IMockSdexAbi,
            address: this.sdexAddress,
            account,
            blockTag: 'pending',
            functionName: 'mintAndApprove',
            args: [to, amount, target, maxUint256]
        });

        return await this.client.writeContract(request);
    }

    async approve(to: Hash, amount: bigint, account: Account): Promise<Hash> {
        const { request } = await this.client.simulateContract({
            abi: IMockSdexAbi,
            address: this.sdexAddress as Hash,
            account,
            blockTag: 'pending',
            functionName: 'approve',
            args: [to, amount]
        });

        return await this.client.writeContract(request);
    }

    async approveMax(to: Hash, account: Account): Promise<Hash> {
       return await this.approve(to, maxUint256, account);
    }

    async balanceOf(address: Hash): Promise<bigint>{
        return await this.client.readContract({
            address: this.sdexAddress,
            abi: IMockSdexAbi,
            functionName: 'balanceOf',
            args: [address]
        });
    }
}