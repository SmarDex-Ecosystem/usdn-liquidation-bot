import { type Address, type PublicActions, isAddress } from 'viem';
import { abi } from './BaseOracleMiddlewareAbi.ts';

export default class OracleMiddlewareContract {
    constructor(
        /** The address of the OracleMiddleware smart contract */
        private readonly contractAddress: Address,
        /** The address of the OracleMiddleware smart contract */
        private readonly blockchainClient: PublicActions,
    ) {
        if (!isAddress(contractAddress)) {
            throw new Error('Invalid Ethereum address for the oracle middleware');
        }
    }

    /**
     * Get the amount of time (in seconds) a validator is required to wait before it can validate an initiate action
     * @returns The validation delay (in seconds)
     */
    async getValidationDelay() {
        const validationDelay = await this.blockchainClient.readContract({
            abi,
            address: this.contractAddress,
            functionName: 'getValidationDelay',
        });

        // This is a sanity check, it would mean users need to wait more than 285 million years to validate an action
        if (validationDelay > BigInt(Number.MAX_SAFE_INTEGER)) {
            throw new Error('The validation delay is higher than MAX_SAFE_INTEGER');
        }

        return Number(validationDelay.toString());
    }

    /**
     * Get the amount of time (in seconds) before which a pending action can only be validated using a low latency oracle
     * @returns The low latency delay (in seconds)
     */
    async getLowLatencyDelay() {
        return this.blockchainClient.readContract({
            abi,
            address: this.contractAddress,
            functionName: 'getLowLatencyDelay',
        });
    }
}
