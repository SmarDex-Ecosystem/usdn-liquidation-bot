import { chainlinkAdapter, pythAdapter } from './adapters/oracles/index.ts';
import { usdnProtocolContract } from './adapters/usdn-protocol/index.ts';
import { liquidationPriceHistory } from './services/liquidationPriceHistory/index.ts';
import LiquidationsService from './services/liquidations/LiquidationsService.ts';
import PendingActionsService from './services/pending-actions/PendingActionsService.ts';
import { getBlockchainClient } from './utils/index.ts';

const blockChainClient = getBlockchainClient();
const pendingActionsService = new PendingActionsService(
    usdnProtocolContract,
    blockChainClient,
    pythAdapter,
    chainlinkAdapter,
);
const liquidationsService = new LiquidationsService(usdnProtocolContract, blockChainClient, liquidationPriceHistory);

const main = async () => {
    console.log(`Account that will sign transactions: ${blockChainClient.account.address}`);
    pendingActionsService.watchActionablePendingActions();
    liquidationsService.watchLiquidations();
};

main();
