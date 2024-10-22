import type { Hex, PublicActions } from 'viem';
import type UsdnProtocolContract from '../../adapters/usdn-protocol/blockchain/UsdnProtocolContract.ts';
import type LiquidationPriceHistoryService from '../liquidation-price-history/LiquidationPriceHistory.ts';
import { getBlockTime } from '../../utils/index.ts';

export default class LiquidationsService {
    constructor(
        /** Adapter to communicate with the USDN Protocol's smart contract */
        private readonly usdnProtocol: UsdnProtocolContract,
        /** Client to communicate with the blockchain */
        private readonly blockchainClient: PublicActions,
        /** Service to keep track of all the usable prices for liquidations */
        private readonly liquidationPriceHistory: LiquidationPriceHistoryService,
    ) {}

    /** Watch for liquidations at every block and launch a TX when one (or more) is possible */
    async watchLiquidations() {
        this.liquidationPriceHistory.watchNewPrices();

        /** block time in milliseconds */
        const blockTimeMs = getBlockTime(await this.blockchainClient.getChainId()) * 1000;
        let currentTimeout: NodeJS.Timeout | undefined;

        const unwatch = this.blockchainClient.watchBlockNumber({
            onBlockNumber: (blockNumber) => {
                currentTimeout = setTimeout(
                    async () => {
                        currentTimeout = undefined;
                        const priceRecord = this.liquidationPriceHistory.getSmallestPriceRecord();
                        if (!priceRecord) {
                            console.warn(`No price record for block ${blockNumber}`);
                            return;
                        }

                        let hash: Hex | undefined;
                        let liquidatedTicksAmount = 0;
                        try {
                            const result = await this.usdnProtocol.liquidate(
                                priceRecord.signature,
                                priceRecord.oracleFee,
                            );
                            hash = result.hash;
                            liquidatedTicksAmount = result.liquidatedTicksAmount;
                        } catch (error) {
                            // 0x45805f5d can happen because of timing issues, we can just skip that block and try again on the next one
                            if ((error as Error).toString().includes('0x45805f5d')) {
                                console.warn(`[${+Date.now()}] Encountered error 0x45805f5d for block ${blockNumber}`);
                                return;
                            }

                            // throw an error on any other error
                            throw error;
                        }

                        const formattedPrice = +(priceRecord.price / 10n ** 6n).toString() / 100;
                        if (liquidatedTicksAmount === 0) {
                            console.debug(
                                `[${+Date.now()}] No ticks to liquidate at block ${blockNumber} with price ${formattedPrice}`,
                            );
                        } else {
                            console.log(
                                `[${+Date.now()}] ${liquidatedTicksAmount} ticks to liquidate at block ${blockNumber} with price ${formattedPrice}, hash: ${hash}`,
                            );
                        }
                    },
                    blockTimeMs * 0.8, // wait for 80% of the block time before checking prices and submitting transactions
                );
            },
        });

        // handle graceful shutdown
        process.on('SIGINT', () => {
            unwatch();
            if (currentTimeout) clearTimeout(currentTimeout);
        });
        process.on('SIGTERM', () => {
            unwatch();
            if (currentTimeout) clearTimeout(currentTimeout);
        });
    }
}
