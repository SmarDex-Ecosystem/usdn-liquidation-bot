import type { Hex, PublicActions } from 'viem';
import type UsdnProtocolContract from '../../adapters/usdn-protocol/blockchain/UsdnProtocolContract.ts';
import { getBotEthBalance, sleep } from '../../utils/index.ts';
import type LiquidationPriceHistoryService from '../liquidation-price-history/LiquidationPriceHistory.ts';

const LOW_BALANCE_THRESHOLD = process.env.LOW_BALANCE_THRESHOLD
    ? Number.parseFloat(process.env.LOW_BALANCE_THRESHOLD)
    : 0.1;

export default class LiquidationsService {
    private isRunning = false;

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
        if (this.isRunning) return;

        // handle graceful shutdown
        process.on('SIGINT', () => {
            this.isRunning = false;
        });
        process.on('SIGTERM', () => {
            this.isRunning = false;
        });

        const balance = await getBotEthBalance();

        if (balance < LOW_BALANCE_THRESHOLD) {
            // emit a warning if the bot balance is dangerously low
            console.warn(`Bot balance is too low: ${balance}`);
        }

        this.isRunning = true;
        this.liquidationPriceHistory.watchNewPrices();

        while (this.isRunning) {
            await sleep(5000);
            const blockNumber = await this.blockchainClient.getBlockNumber();
            const priceRecord = this.liquidationPriceHistory.getSmallestPriceRecord();
            if (!priceRecord) {
                console.warn(`No price record for block ${blockNumber}`, this.isRunning);
                continue;
            }

            let hash: Hex | undefined;
            let liquidatedTicksAmount = 0;
            try {
                const result = await this.usdnProtocol.liquidate(priceRecord.signature, priceRecord.oracleFee);
                hash = result.hash;
                liquidatedTicksAmount = result.liquidatedTicksAmount;
            } catch (error) {
                // 0x45805f5d can happen because of timing issues, we can just skip that block and try again on the next one
                if ((error as Error).toString().includes('0x45805f5d')) {
                    console.warn(`[${+Date.now()}] Encountered error 0x45805f5d for block ${blockNumber}`);
                    continue;
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
        }

        console.log('LiquidationPriceService has shutdown');
    }
}
