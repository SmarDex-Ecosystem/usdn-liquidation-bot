# Changelog

## [1.0.0](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/compare/v0.2.0...v1.0.0) (2025-01-23)


### Features

* add low balance warning ([#43](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/43)) ([343e86b](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/343e86bd1f77f0cadf86b5c85b24e2923ef581a1))
* **pending-actions:** fetch the oracle middleware delays from the blockchain ([#37](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/37)) ([a2642ca](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/a2642ca72947d54b40d7942e7e8dd64ed0dcf8f7))
* **pending-actions:** update the calls to getActionablePendingActions because of breaking changes ([#36](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/36)) ([ddeaf59](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/ddeaf59d3db2e85a9fb018a676a8c1e3b63f6734))


### Bug Fixes

* **chainlink-adapter:** return null if the latest round's ts == target ts ([#35](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/35)) ([91d1649](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/91d1649dd6f088aa3dade58b43b988c36d10ea42))
* **pending-actions:** fix the target timestamp of pending actions for high latency oracle price ([#38](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/38)) ([55c6c9b](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/55c6c9b8187144f53e4238f571496445c71e9100))
* **pending-actions:** lower the amount of pending ations to fetch to avoid an oom error ([#39](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/39)) ([36822d9](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/36822d98072c270007b762b4b75b473b62df1875))
* use safe value for BeaconChain suggestedBaseFee ([#33](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/33)) ([2fd45d1](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/2fd45d18c282995e2e9a6640676ad5153701ff1c))


### Build System

* bump npm version to 1.0.0 ([#48](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/48)) ([13eecbf](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/13eecbf48885da77c48969b79a355f80474adb65))

## [0.2.0](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/compare/v0.1.1...v0.2.0) (2024-10-22)


### ⚠ BREAKING CHANGES

* **pending-actions:** A PRIVATE_KEY environment variable is required for the simulation to work

### Features

* add env file and change config ([#26](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/26)) ([34a5c72](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/34a5c72af0cc8886d337aec06367cefe267e216d))
* **gas-price-adapter:** add an adapter for the beaconcha.in gas price apiand use it for Sepolia ([#30](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/30)) ([c2ce3dc](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/c2ce3dc2dd300c5be27e17792a98e4f2bf11ea53))
* launch watcher services on startup ([#29](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/29)) ([fed49b5](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/fed49b5f179ff672ba5151f1224547edcaa1d568))
* **liquidations:** add a service that watches for new blocks and attempt liquidations ([#28](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/28)) ([498cf60](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/498cf60d464be49217f1e900a45328e4a687d0bf))
* **pending-actions:** add a service to validate actionable pending actions ([#25](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/25)) ([91e22ab](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/91e22ab0bd0714e10bba9620528d7cbd850ab76a))
* **pending-actions:** simulate pending actions validation ([#22](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/22)) ([841a26e](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/841a26efafa1fb4c2864f4b11c11afbb1e977fba))
* refactor tests and clean unused functions ([#24](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/24)) ([122dcf3](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/122dcf33aef7a2a075d0e9dab4958f0ae73dcba0))
* **usdn-protocol:** add a function to the adapter to simulate and launch a liquidations TX ([#27](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/27)) ([e1fdb89](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/e1fdb8989eea103ca4ad24a021aa7ff288026fe5))

## [0.1.1](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/compare/v0.1.0...v0.1.1) (2024-09-26)


### Features

* add basic template ([#1](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/1)) ([62627f1](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/62627f165c574c8343d7ad9d68634f61afd885cb))
* gas management ([#7](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/7)) ([60d3152](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/60d3152195c7db4e9845c37ba67d6ec94de04d51))
* get highest populated tick ([#8](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/8)) ([2c5c609](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/2c5c60912bdf28e1039ce27705a340e132702334))
* get the stETH/wstETH ratio ([#9](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/9)) ([b029881](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/b029881f1be752487a2378ec8fe2afa5940cfadf))
* **oracle:** add an adapter to get data from the Pyth oracle (HTTP and WS) ([#3](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/3)) ([4352c5e](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/4352c5ed9c3b41249631cb51e89a2d604f22d2c2))
* **oracles:** add an adapter for Chainlink ([#10](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/10)) ([a0e545f](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/a0e545f1ab4fdaa37311237443424d3bea271788))
* **oracles:** add an adapter to get data from the Redstone oracle ([#2](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/2)) ([2ba3a75](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/2ba3a755a147fff98ff1f1c448606d793427b92d))
* record prices ([#13](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/13)) ([f9f57ac](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/f9f57ac6820a809ed97560dcae4f6037d3f0f84d))
* remove axios ([#11](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/11)) ([d944995](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/d94499530f9fc78b5be269c3acd3a15945feed42))
* use cicd to build and release docker image ([#15](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/15)) ([e5dc315](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/e5dc315f580eafc55c000ca5fe8b91be84289788))


### Bug Fixes

* add .release-please-manifest.json ([#17](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/17)) ([7136f2e](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/7136f2e43edb73279adfcdedbac5cfb86bf3918a))
* cicd release ([#16](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/16)) ([ec43a6f](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/ec43a6ff07b73267d1a4a89faf83be204b3fcf3d))
* dockerfile ([#6](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/6)) ([0e771c7](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/0e771c73998f55384006af8bd607487a6c293bd2))
* rename .release-please-manifest.json ([#18](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/issues/18)) ([015fedd](https://github.com/SmarDex-Ecosystem/usdn-liquidation-bot/commit/015fedd0ac3f8487e8deef3ca2cadafe25f60470))
