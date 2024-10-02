import { type Hex, type PublicClient, isAddress } from 'viem';
import { abi } from './WstETHAbi.ts';

export default class WstETHContract {
    /** Client to use to communicate with the smart contract */
    private readonly blockchainClient: PublicClient;
    /** Address of usdnProtocol */
    private readonly contractAddress: Hex;

    constructor(blockchainClient: PublicClient, contractAddress: Hex) {
        if (!isAddress(contractAddress)) {
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
            address: this.contractAddress as Hex,
            abi: abi,
            functionName: 'stEthPerToken',
        });
    }
}
