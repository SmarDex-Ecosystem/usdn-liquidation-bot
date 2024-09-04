# Fork liquidations demo

This is a demo of usdn bot liquidations.


### Requirements

- Have docker installed: [here](https://docs.docker.com/engine/install/)
- Have foundry installed: [here](https://book.getfoundry.sh/getting-started/installation)
- Cloning the usdn repo at root:
```git clone https://github.com/SmarDex-Ecosystem/usdn-contracts.git```


### Launch the demo

- In a first terminal launch: `anvil -f https://eth.llamarpc.com --chain-id 31337`
- In a second terminal launch: `./usdn-contracts/script/deployFork.sh`
- Launch `cp .env.example .env` 
- Fill the `.env` addresses with values from the bottom of: 
`usdn-contracts/broadcast/01_Deploy.s.sol/31337/run-latest.json` 
- Build the liquidation image: `docker build --tag 'liquidation_bot' .`
- Launch the demo: `docker run --env-file .env --network=host liquidation_bot`

