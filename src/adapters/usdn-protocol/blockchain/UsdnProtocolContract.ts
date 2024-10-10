import {
    type Address,
    type Hex,
    type PublicActions,
    type ReadContractParameters,
    type WalletClient,
    isAddress,
    zeroAddress,
} from 'viem';
import { abi } from './UsdnProtocolAbi.ts';

export type FunctionCall = Omit<ReadContractParameters<typeof abi>, 'abi' | 'address'>;

export default class UsdnProtocolContract {
    /** Client to use to interact with the smart contract */
    private readonly blockchainClient: WalletClient & PublicActions;
    /** The address of the USDN Protocol's smart contract */
    private readonly contractAddress: Address;

    constructor(contractAddress: Address, blockchainClient: WalletClient & PublicActions) {
        if (!isAddress(contractAddress)) {
            throw new Error('Invalid Ethereum address for the USDN protocol');
        }

        this.contractAddress = contractAddress;
        this.blockchainClient = blockchainClient;
    }

    /**
     * Get the pending actions that rewards the caller when validated
     * @returns The list of pending actions that can be validated with the list of corresponding raw indices
     */
    async getActionablePendingActions() {
        const [pendingActions, rawIndices] = await this.blockchainClient.readContract({
            abi: abi,
            address: this.contractAddress,
            blockTag: 'pending',
            functionName: 'getActionablePendingActions',
            // query for the 0 address so we get every actionable pending actions
            args: [zeroAddress],
        });

        return { pendingActions, rawIndices };
    }

    /**
     * Simulate the validation of pending actions with the current parameters and return the amount that it would validate
     * @param priceData The price data for each actions that can be validated
     * @param rawIndices The raw indices corresponding to the price data entries
     * @param oracleFee The fee to send as value to pay for oracle price validations
     * @returns The amount of validated pending actions
     */
    async validateActionablePendingActions(
        priceData: readonly Hex[],
        rawIndices: readonly bigint[],
        oracleFee: bigint,
    ): Promise<bigint> {
        const { request, result } = await this.blockchainClient.simulateContract({
            abi,
            address: this.contractAddress,
            blockTag: 'pending',
            account: this.blockchainClient.account,
            functionName: 'validateActionablePendingActions',
            value: oracleFee,
            args: [
                {
                    priceData,
                    rawIndices,
                },
                BigInt(rawIndices.length),
            ],
        });

        if (result > 0) {
            // TODO log the TX hash?
            await this.blockchainClient.writeContract(request);
        }

        return result;
    }
}
