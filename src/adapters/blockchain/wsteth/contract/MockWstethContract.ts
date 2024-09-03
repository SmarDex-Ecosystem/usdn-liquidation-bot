import { type TestClient, type WalletActions, type  PublicActions, isAddress, type Hash, type Account, maxUint256} from 'viem';
import { IMockWstethAbi } from './abi.ts';

export class MockWstethContract {
    private client: TestClient & WalletActions & PublicActions;
    private wstethAddress: Hash;

    constructor(client: TestClient & WalletActions & PublicActions) {
        this.client = client;

        if (!process.env.MOCK_WSTETH_ADDRESS || !isAddress(process.env.MOCK_WSTETH_ADDRESS)) {
            throw new Error('Env var MOCK_WSTETH_ADDRESS is not defined');
        }

        this.wstethAddress = process.env.MOCK_WSTETH_ADDRESS;
    }

    async mint(to: Hash, amount: bigint, account: Account): Promise<Hash> {
        const { request } = await this.client.simulateContract({
            abi: IMockWstethAbi,
            address: this.wstethAddress as Hash,
            account,
            blockTag: 'pending',
            functionName: 'mint',
            args: [to, amount]
        });

        return await this.client.writeContract(request);
    }

    async approve(to: Hash, amount: bigint, account: Account): Promise<Hash> {
        const { request } = await this.client.simulateContract({
            abi: IMockWstethAbi,
            address: this.wstethAddress as Hash,
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

    async balanceOf(address: Hash) {
        return await this.client.readContract({
            abi: IMockWstethAbi,
            address: this.wstethAddress as Hash,
            functionName: 'balanceOf',
            args: [address],
        });
    }

   
}
