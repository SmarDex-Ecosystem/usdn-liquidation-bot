import type { PublicClient } from 'viem';
import { abi } from './WstETHAbi.ts';

export default class LidoContract {
    /** Client to use to communicate with the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Address of usdnProtocol */
    private readonly contractAddress: `0x${string}`;

    constructor(blockchainClient: PublicClient, contractAddress: `0x${string}`) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
            throw new Error('Invalid Ethereum address.');
        }
        this.blockchainClient = blockchainClient;
        this.contractAddress = contractAddress;
    }

    /** Call the getStETHPerToken function of the contract
     * @returns the ratio of stETH to wstETH
     */
    async getStETHPerToken() {
        return this.blockchainClient.readContract({
            address: this.contractAddress as `0x${string}`,
            abi: abi,
            functionName: 'stEthPerToken',
        });
    }
}
