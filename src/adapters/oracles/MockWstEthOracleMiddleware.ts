import { isAddress, stringToHex, type Hash, type TestClient, type WalletActions, type PublicActions, type Account} from 'viem'; 
import { IMockWstEthOracleMiddleware } from './abi.ts';
import type { ParseAndValidatePrice } from "./types.ts";
import { ProtocolAction } from "../blockchain/usdn/contract/types.ts"

export class MockMiddlewareContract {
    private client: TestClient & WalletActions & PublicActions;
    private mockMiddleware: Hash;

    constructor(client: TestClient & WalletActions & PublicActions) {
        this.client = client;

        if (!process.env.MOCK_MIDDLEWARE || !isAddress(process.env.MOCK_MIDDLEWARE)) {
            throw new Error('Env var MOCK_MIDDLEWARE is not defined');
        }

        this.mockMiddleware = process.env.MOCK_MIDDLEWARE;
    }

    async setWstethMockedPrice(newWstethPrice: bigint, account: Account): Promise<Hash> {
        const { request } = await this.client.simulateContract({
            abi: IMockWstEthOracleMiddleware,
            address: this.mockMiddleware,
            account,
            blockTag: 'pending',
            functionName: 'setWstethMockedPrice',
            args: [newWstethPrice]
        });

        return await this.client.writeContract(request);
    }

    async getWstethMockedPrice(): Promise<bigint>{
        return await this.client.readContract({
            abi: IMockWstEthOracleMiddleware,
            address: this.mockMiddleware,
            functionName: 'getWstethMockedPrice'
        });
    }

    async parseAndValidatePrice(
        actionId: Hash, 
        targetTimestamp: bigint, 
        action: number, 
        data: Hash,
        account: Account
    ): Promise<{hash: string, result: ParseAndValidatePrice}> {

        const { request, result } = await this.client.simulateContract({
            abi: IMockWstEthOracleMiddleware,
            address: this.mockMiddleware,
            account,
            blockTag: 'pending',
            functionName: 'parseAndValidatePrice',
            args: [ 
                actionId, 
                targetTimestamp, 
                action, 
                data
            ]
        });

        const hash = await this.client.writeContract(request);

        return {
            hash,
            result
        };
    }


    async parseCurrent(account: Account): Promise<{hash: string, result: ParseAndValidatePrice}> {
        const timestamp = (await this.client.getBlock()).timestamp

        return await this.parseAndValidatePrice(
            stringToHex("", { size: 32 }),
            timestamp,
            ProtocolAction.Initialize,
            stringToHex("", { size: 0 }),
            account
        )
    }

    async setVerifySignature(verify: boolean, account: Account): Promise<`0x${string}`> {
        const { request, result } = await this.client.simulateContract({
            abi: IMockWstEthOracleMiddleware,
            address: this.mockMiddleware,
            account,
            blockTag: 'pending',
            functionName: 'setVerifySignature',
            args: [verify]
        });

        return await this.client.writeContract(request);
    }
}

