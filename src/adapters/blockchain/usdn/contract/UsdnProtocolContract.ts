import { type Account, type TestClient, isAddress, stringToHex, type WalletActions, type PublicActions, type Hash} from 'viem';
import type {PreviousActionsData, InitiateOpenResultData } from "./types.ts"
import { IUsdnProtocolAbi } from './abi.ts';
import type IGasPriceAdapter from '../../../gas-price/IGasPriceAdapter.ts';

export class UsdnProtocolContract {
    private client: TestClient & WalletActions & PublicActions;
    private gasPriceAdapter: IGasPriceAdapter;
    private emptyActionsData: PreviousActionsData;
    usdnProtocolAddress: Hash;

    constructor(client: TestClient & WalletActions & PublicActions,  gasPriceAdapter: IGasPriceAdapter) {
        this.client = client;
        this.gasPriceAdapter = gasPriceAdapter;

        if (!process.env.USDN_PROTOCOL_ADDRESS || !isAddress(process.env.USDN_PROTOCOL_ADDRESS)) {
            throw new Error('Env var USDN_PROTOCOL_ADDRESS is not defined');
        }
        this.usdnProtocolAddress = process.env.USDN_PROTOCOL_ADDRESS;

        this.emptyActionsData = {
            priceData: [],
            rawIndices: []
        };
    }

    async liquidate(account: Account): Promise<{ txHash: string; amount: bigint }> {
        const { request, result } = await this.client.simulateContract({ 
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            account,
            blockTag: 'pending',
            functionName: 'liquidate',
            args: [stringToHex("", {size: 0}), 10],
        });

        let hash = '';
        if (result > 0n) {
            const gasPrice = await this.gasPriceAdapter.getGasPrice();
            request.maxFeePerGas = gasPrice.suggestedBaseFee;
            request.maxPriorityFeePerGas = gasPrice.fastPriorityFee;

            hash = await this.client.writeContract(request);
        }

        return {
            amount: result,
            txHash: hash,
        };
    }

    async mockLiquidate(account: Account): Promise<bigint> {
        const { request, result } = await this.client.simulateContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            account,
            blockTag: 'pending',
            functionName: 'liquidate',
            args: [stringToHex("", {size: 0}) as `0x${string}`, 10]
        });

        await this.client.writeContract(request);

        return result;
    }

    async getActionablePendingActions() {
        return await this.client.readContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            blockTag: 'pending',
            functionName: 'getActionablePendingActions',
            args: ['0x0000000000000000000000000000000000000000'],
        });
    }

    async getHighestPopulatedTick() {
        return await this.client.readContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            functionName: 'getHighestPopulatedTick'
        });
    }

    async getTickVersion(tick: number) {
        return await this.client.readContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            functionName: 'getTickVersion',
            args: [Number(tick)]
        });
    }

    async getEffectivePriceForTick(tick:number) {
        return await this.client.readContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            functionName: 'getEffectivePriceForTick',
            args: [Number(tick)]
        });
    }

    async getSecurityDepositValue() {
        return await this.client.readContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            functionName: 'getSecurityDepositValue'
        });
    }

    async validateActionablePendingActions(priceData: readonly Hash[], rawIndices: readonly bigint[], account: Account) {
        const { request, result } = await this.client.simulateContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            blockTag: 'pending',
            account: account,
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

            hash = await this.client.writeContract(request);
        }
    
        return {
            amount: result,
            txHash: hash,
        };
    };   

    async initiateOpenPosition(
        amount: bigint,
        desiredLiqPrice: bigint,
        to: Hash,
        validator: Hash,
        permit2TokenBitfield: number,
        currentPriceData: Hash,
        previousActionsData: PreviousActionsData,
        value: bigint,
        account: Account
    ): Promise<{ txHash: string; result: InitiateOpenResultData}> {
        const { request, result } = await this.client.simulateContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            account: account,
            blockTag: 'pending',
            functionName: 'initiateOpenPosition',
            args: [
                amount,
                desiredLiqPrice,
                to,
                validator,
                permit2TokenBitfield,
                currentPriceData,
                previousActionsData
            ],
            value, 
        });

        const txHash = await this.client.writeContract(request);
        
        return {
            result,
            txHash
        };
    }

    async initiateRandomOpen(
        amount: bigint,
        initialPrice: bigint,
        account: Account
    ): Promise<{ txHash: string; result: InitiateOpenResultData}> {
        const randomLiqDivisor = BigInt(Math.floor(Math.random() * 3) + 2); // random 2, 3 or 4
        const desiredLiqPrice = initialPrice / randomLiqDivisor;

        return await this.initiateOpenPosition(
            amount,
            desiredLiqPrice,
            account.address,
            account.address,
            0,
            stringToHex("", { size: 0 }),
            this.emptyActionsData,
            await this.getSecurityDepositValue(),
            account
        );
    }

    async validateOpenPosition(
        validator: Hash,
        currentPriceData: Hash,
        previousActionsData: PreviousActionsData,
        account: Account
    ): Promise<{ txHash: string; result: boolean}> {
        const { request, result } = await this.client.simulateContract({
            abi: IUsdnProtocolAbi,
            address: this.usdnProtocolAddress,
            account,
            blockTag: 'pending',
            functionName: 'validateOpenPosition',
            args: [
                validator,
                currentPriceData,
                previousActionsData
            ],
        });

        const txHash = await this.client.writeContract(request);
        
        return {
            result,
            txHash
        };
    }

    async validateOpenHelper(account: Account): Promise<{ txHash: string; result: boolean}> {
        return await this.validateOpenPosition(
            account.address,
            stringToHex("", { size: 0 }),
            this.emptyActionsData,
            account
        );
    }
}
