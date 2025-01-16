import { chainlinkAdapter, pythAdapter } from './adapters/oracles/index.ts';
import { oracleMiddlewareContract, usdnProtocolContract } from './adapters/usdn-protocol/index.ts';
import { liquidationPriceHistory } from './services/liquidation-price-history/index.ts';
import LiquidationsService from './services/liquidations/LiquidationsService.ts';
import PendingActionsService from './services/pending-actions/PendingActionsService.ts';
import { getBlockchainClient } from './utils/index.ts';
import { type AWSRegion, SecretsRetriever } from '@common-ra2/aws-utils';


process.env.PRIVATE_KEY = await SecretsRetriever.retrieveSecretKeyByName(
    process.env.AWS_REGION as AWSRegion,
    `${process.env.PRIVATE_KEY_SECRET_NAME}`,
    'PrivateKey'
);

const blockChainClient = getBlockchainClient();
const pendingActionsService = new PendingActionsService(
    usdnProtocolContract,
    oracleMiddlewareContract,
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
