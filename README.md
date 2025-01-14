# USDN Liquidation/Validation Bot

This repository contains the code for a fully functional bot that can interact with the USDN protocol to:
* Liquidate ticks that include positions
* Validate pending actions

If successful, those actions will yield a reward to the address used to execute them.

## How Does It Work

### Liquidations

After every block, the bot will check if it can liquidate positions with the lowest price given by Pyth in a certain time frame.
If that's the case, the bot will launch a transaction on the network to attempt to liquidate the positions.
If it is successful, the address used to sign the transaction will receive a reward in assets used as the underlying for the USDN protocol ([wstEth](https://www.coingecko.com/en/coins/wrapped-steth) for example).

### Validation Of Pending Actions

After every block, the bot will check if there are actionable pending actions that can be validated in the next block.
If that's the case, the bot will launch a transaction on the network to attempt to validate this pending action.
If it's successful, the address used to sign the transaction will receive the security deposit of this pending action in native tokens for the chain it is on (ETH for Ethereum, POL for Polygon etc.)

## How To Use

### Environment Variables

First and foremost, you will need to copy the `.env.example` in a `.env` file, and set a value for each environment variable:
* `HERMES_URL`: An API endpoint to get Pyth prices from the [Hermes Web Service](https://docs.pyth.network/price-feeds/how-pyth-works/hermes).
  * The default value is the public Hermes endpoint : `https://hermes.pyth.network`.
* `RPC_URL`: An RPC URL for the network the USDN protocol is on (WS is preferred, but HTTP is supported).
  * We strongly suggest the use of private mem pools such as [Flashbot Protect](https://docs.flashbots.net/flashbots-protect/overview) to avoid frontrunning.
  * The default value is a public RPC: `https://ethereum.rpc.subquery.network/public`.
* `ETHERSCAN_API_KEY`: The Etherscan API Key that will be used to fetch the gas price before sending a transaction.
* `USDN_PROTOCOL`: The address of the USDN protocol.
* `CHAINLINK_USD_ETH_FEED`: The address of the ETH/USD [price feed of Chainlink](https://docs.chain.link/data-feeds/price-feeds/addresses).
  * By default, it's the address of the ETH/USD price feed on Ethereum `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`.
* `WSTETH`: The address of the underlying asset used by the USDN protocol.
  * By default, it's the address of the wstETH token used on Ethereum `0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0`.
* `PRIVATE_KEY`: The private key of the address that will sign transactions.
  * **Storing private keys in environment variables is considered unsafe.** We strongly encourage you to at least use [GitHub Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) if you deploy this bot using GitHub actions. Or ideally, to use [AWS KMS](https://aws.amazon.com/kms/) and improve the bot so it can make use of it.
  * The address corresponding to the private key needs funds to pay for gas before it can sign transactions on the network. Please make sure the address has the necessary funds before deploying the bot.
* `LOW_BALANCE_THRESHOLD`: The balance of ETH the address corresponding to the given private key below which warning logs will be emitted.
  * The default value is 0.1 ETH.

### For Local Development

To launch the bot on your local machine, you can simply run `npm run dev`.

### Using The CLI

First, use `npm run build` to build the necessary files.

Then, use `node --env-file=.env dist/index.js` to launch the bot.

### Using Docker

First, build the container using `docker build . -t liqbot`.

Then, launch the container using `docker run --env-file .env -d liqbot`

## Disclaimer

> ⚠️ **As anyone can run this bot, and as MEV is a highly competitive field, we cannot guarantee that transactions will be successful.**
>
> We strongly suggest improving this bot to get an edge on your competitors before running it in production, or you risk wasting gas.