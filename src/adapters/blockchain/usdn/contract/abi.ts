export const IUsdnProtocolAbi = [
    {
        "type": "fallback",
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "ADMIN_CRITICAL_FUNCTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_PROXY_UPGRADE_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_EXTERNAL_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_OPTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_PROTOCOL_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_USDN_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "CRITICAL_FUNCTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "PROXY_UPGRADE_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_EXTERNAL_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_OPTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_PROTOCOL_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_USDN_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "acceptDefaultAdminTransfer",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "beginDefaultAdminTransfer",
        "inputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "cancelDefaultAdminTransfer",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "changeDefaultAdminDelay",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "defaultAdmin",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "defaultAdminDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "defaultAdminDelayIncreaseWait",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "funding",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "funding_",
                "type": "int256",
                "internalType": "int256"
            },
            {
                "name": "fundingPerDay_",
                "type": "int256",
                "internalType": "int256"
            },
            {
                "name": "oldLongExpo_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getActionablePendingActions",
        "inputs": [
            {
                "name": "currentUser",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "actions_",
                "type": "tuple[]",
                "internalType": "struct IUsdnProtocolTypes.PendingAction[]",
                "components": [
                    {
                        "name": "action",
                        "type": "uint8",
                        "internalType": "enum IUsdnProtocolTypes.ProtocolAction"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "validator",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "securityDepositValue",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "var1",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "var2",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var3",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var4",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var5",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var6",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var7",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "rawIndices_",
                "type": "uint128[]",
                "internalType": "uint128[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEffectivePriceForTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "assetPrice",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "longTradingExpo",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accumulator",
                "type": "tuple",
                "internalType": "struct HugeUint.Uint512",
                "components": [
                    {
                        "name": "hi",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lo",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getEffectivePriceForTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEffectiveTickForPrice",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEffectiveTickForPrice",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "assetPrice",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "longTradingExpo",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accumulator",
                "type": "tuple",
                "internalType": "struct HugeUint.Uint512",
                "components": [
                    {
                        "name": "hi",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lo",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "tickSpacing",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getLongPosition",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "pos_",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.Position",
                "components": [
                    {
                        "name": "validated",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "totalExpo",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "amount",
                        "type": "uint128",
                        "internalType": "uint128"
                    }
                ]
            },
            {
                "name": "liquidationPenalty_",
                "type": "uint24",
                "internalType": "uint24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPositionValue",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "value_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTickLiquidationPenalty",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "liquidationPenalty_",
                "type": "uint24",
                "internalType": "uint24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserPendingAction",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "action_",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PendingAction",
                "components": [
                    {
                        "name": "action",
                        "type": "uint8",
                        "internalType": "enum IUsdnProtocolTypes.ProtocolAction"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "validator",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "securityDepositValue",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "var1",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "var2",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var3",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var4",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var5",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var6",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var7",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "grantRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "hasRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "depositAmount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "longAmount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "desiredLiqPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initializeStorage",
        "inputs": [
            {
                "name": "usdn",
                "type": "address",
                "internalType": "contract IUsdn"
            },
            {
                "name": "sdex",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            },
            {
                "name": "asset",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            },
            {
                "name": "oracleMiddleware",
                "type": "address",
                "internalType": "contract IBaseOracleMiddleware"
            },
            {
                "name": "liquidationRewardsManager",
                "type": "address",
                "internalType": "contract IBaseLiquidationRewardsManager"
            },
            {
                "name": "tickSpacing",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "feeCollector",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "managers",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.Managers",
                "components": [
                    {
                        "name": "setExternalManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "criticalFunctionsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "setProtocolParamsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "setUsdnParamsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "setOptionsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "proxyUpgradeManager",
                        "type": "address",
                        "internalType": "address"
                    }
                ]
            },
            {
                "name": "protocolFallback",
                "type": "address",
                "internalType": "contract IUsdnProtocolFallback"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "initiateClosePosition",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "amountToClose",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initiateDeposit",
        "inputs": [
            {
                "name": "amount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "permit2TokenBitfield",
                "type": "uint8",
                "internalType": "Permit2TokenBitfield.Bitfield"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initiateOpenPosition",
        "inputs": [
            {
                "name": "amount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "desiredLiqPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "permit2TokenBitfield",
                "type": "uint8",
                "internalType": "Permit2TokenBitfield.Bitfield"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "posId_",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initiateWithdrawal",
        "inputs": [
            {
                "name": "usdnShares",
                "type": "uint152",
                "internalType": "uint152"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "liquidate",
        "inputs": [
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "iterations",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [
            {
                "name": "liquidatedPositions_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "longAssetAvailableWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "available_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "longTradingExpoWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "expo_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "maxTick",
        "inputs": [],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "minTick",
        "inputs": [],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingDefaultAdmin",
        "inputs": [],
        "outputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingDefaultAdminDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "internalType": "uint48"
            },
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proxiableUUID",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "rollbackDefaultAdminDelay",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tickHash",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "version",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "transferPositionOwnership",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "upgradeToAndCall",
        "inputs": [
            {
                "name": "newImplementation",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "usdnPrice",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "usdnPrice",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "validateActionablePendingActions",
        "inputs": [
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            },
            {
                "name": "maxValidations",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "validatedActions_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateClosePosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "closePriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateDeposit",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "depositPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateOpenPosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "openPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateWithdrawal",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "withdrawalPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "vaultAssetAvailableWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "available_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "vaultTradingExpoWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "expo_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "BurnSdexOnDepositRatioUpdated",
        "inputs": [
            {
                "name": "newRatio",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminDelayChangeCanceled",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminDelayChangeScheduled",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            },
            {
                "name": "effectSchedule",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminTransferCanceled",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminTransferScheduled",
        "inputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "acceptSchedule",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EMAPeriodUpdated",
        "inputs": [
            {
                "name": "newEMAPeriod",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeBpsUpdated",
        "inputs": [
            {
                "name": "feeBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeCollectorUpdated",
        "inputs": [
            {
                "name": "feeCollector",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeThresholdUpdated",
        "inputs": [
            {
                "name": "feeThreshold",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FundingSFUpdated",
        "inputs": [
            {
                "name": "newFundingSF",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "HighestPopulatedTickUpdated",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "indexed": false,
                "internalType": "int24"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ImbalanceLimitsUpdated",
        "inputs": [
            {
                "name": "newOpenLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newDepositLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newWithdrawalLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newCloseLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newRebalancerCloseLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newLongImbalanceTargetBps",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedClosePosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "originalAmount",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "amountToClose",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "totalExpoRemaining",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedDeposit",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "sdexBurned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedOpenPosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "timestamp",
                "type": "uint40",
                "indexed": false,
                "internalType": "uint40"
            },
            {
                "name": "totalExpo",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "amount",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "startPrice",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedWithdrawal",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "usdnAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LastFundingPerDayUpdated",
        "inputs": [
            {
                "name": "lastFundingPerDay",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            },
            {
                "name": "lastUpdateTimestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatedPosition",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "liquidationPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "effectiveTickPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatedTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "indexed": true,
                "internalType": "int24"
            },
            {
                "name": "oldTickVersion",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "liquidationPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "effectiveTickPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "remainingCollateral",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationIterationUpdated",
        "inputs": [
            {
                "name": "newLiquidationIteration",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationPenaltyUpdated",
        "inputs": [
            {
                "name": "newLiquidationPenalty",
                "type": "uint24",
                "indexed": false,
                "internalType": "uint24"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationPriceUpdated",
        "inputs": [
            {
                "name": "oldPosId",
                "type": "tuple",
                "indexed": true,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "newPosId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationRewardsManagerUpdated",
        "inputs": [
            {
                "name": "newAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatorRewarded",
        "inputs": [
            {
                "name": "liquidator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "rewards",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MaxLeverageUpdated",
        "inputs": [
            {
                "name": "newMaxLeverage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MinLeverageUpdated",
        "inputs": [
            {
                "name": "newMinLeverage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MinLongPositionUpdated",
        "inputs": [
            {
                "name": "minLongPosition",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OracleMiddlewareUpdated",
        "inputs": [
            {
                "name": "newMiddleware",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PositionFeeUpdated",
        "inputs": [
            {
                "name": "positionFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PositionOwnershipTransferred",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "indexed": true,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "oldOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProtocolFeeDistributed",
        "inputs": [
            {
                "name": "feeCollector",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RebalancerBonusUpdated",
        "inputs": [
            {
                "name": "bonus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RebalancerUpdated",
        "inputs": [
            {
                "name": "newAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "previousAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "newAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SafetyMarginBpsUpdated",
        "inputs": [
            {
                "name": "newSafetyMargin",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SecurityDepositRefunded",
        "inputs": [
            {
                "name": "pendingActionValidator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "receivedBy",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SecurityDepositValueUpdated",
        "inputs": [
            {
                "name": "securityDepositValue",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "StalePendingActionRemoved",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TargetUsdnPriceUpdated",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Upgraded",
        "inputs": [
            {
                "name": "implementation",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UsdnRebaseIntervalUpdated",
        "inputs": [
            {
                "name": "interval",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UsdnRebaseThresholdUpdated",
        "inputs": [
            {
                "name": "threshold",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedClosePosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "amountReceived",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "profit",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedDeposit",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amountDeposited",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "usdnMinted",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedOpenPosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "totalExpo",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "newStartPrice",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedWithdrawal",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amountWithdrawn",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "usdnBurned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidationDeadlineUpdated",
        "inputs": [
            {
                "name": "newValidationDeadline",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VaultFeeUpdated",
        "inputs": [
            {
                "name": "vaultFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AccessControlBadConfirmation",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccessControlEnforcedDefaultAdminDelay",
        "inputs": [
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessControlEnforcedDefaultAdminRules",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccessControlInvalidDefaultAdmin",
        "inputs": [
            {
                "name": "defaultAdmin",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessControlUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "neededRole",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardInvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardReentrantCall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardUninitialized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotInitializing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SafeCastOverflowedUintDowncast",
        "inputs": [
            {
                "name": "bits",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UnauthorizedCallContext",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UpgradeFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolAmountToCloseHigherThanPositionAmount",
        "inputs": [
            {
                "name": "amountToClose",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "positionAmount",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolDepositTooSmall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolEtherRefundFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolImbalanceLimitReached",
        "inputs": [
            {
                "name": "imbalanceBps",
                "type": "int256",
                "internalType": "int256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInsufficientOracleFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAddressTo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAddressValidator",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAssetDecimals",
        "inputs": [
            {
                "name": "assetDecimals",
                "type": "uint8",
                "internalType": "uint8"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidBurnSdexOnDepositRatio",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidEMAPeriod",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidExpoImbalanceLimit",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidFeeCollector",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidFundingSF",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationIteration",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationPenalty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationPrice",
        "inputs": [
            {
                "name": "liquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "startPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationRewardsManagerAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLongExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLongImbalanceTarget",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMaxLeverage",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMiddlewareAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMinLeverage",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPendingActionData",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPositionFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidProtocolFeeBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidRebalancerBonus",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidRebalancerTick",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidSafetyMarginBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidTargetUsdnPrice",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidTokenDecimals",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidUsdn",
        "inputs": [
            {
                "name": "usdnAddress",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidUsdnRebaseThreshold",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidValidationDeadline",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidVaultExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidVaultFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLeverageTooHigh",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLeverageTooLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLiquidationPriceSafetyMargin",
        "inputs": [
            {
                "name": "liquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "maxLiquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolLongPositionTooSmall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolMinInitAmount",
        "inputs": [
            {
                "name": "minInitAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolNoPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolOutdatedTick",
        "inputs": [
            {
                "name": "currentVersion",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "providedVersion",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolPositionNotValidated",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolSecurityDepositTooLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolTimestampTooOld",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolUnauthorized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolUnexpectedBalance",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroAmount",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroLongTradingExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroTotalExpo",
        "inputs": []
    },{
        "type": "fallback",
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "ADMIN_CRITICAL_FUNCTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_PROXY_UPGRADE_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_EXTERNAL_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_OPTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_PROTOCOL_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_USDN_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "CRITICAL_FUNCTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "PROXY_UPGRADE_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_EXTERNAL_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_OPTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_PROTOCOL_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_USDN_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "acceptDefaultAdminTransfer",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "beginDefaultAdminTransfer",
        "inputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "cancelDefaultAdminTransfer",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "changeDefaultAdminDelay",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "defaultAdmin",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "defaultAdminDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "defaultAdminDelayIncreaseWait",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "funding",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "funding_",
                "type": "int256",
                "internalType": "int256"
            },
            {
                "name": "fundingPerDay_",
                "type": "int256",
                "internalType": "int256"
            },
            {
                "name": "oldLongExpo_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getActionablePendingActions",
        "inputs": [
            {
                "name": "currentUser",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "actions_",
                "type": "tuple[]",
                "internalType": "struct IUsdnProtocolTypes.PendingAction[]",
                "components": [
                    {
                        "name": "action",
                        "type": "uint8",
                        "internalType": "enum IUsdnProtocolTypes.ProtocolAction"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "validator",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "securityDepositValue",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "var1",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "var2",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var3",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var4",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var5",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var6",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var7",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "rawIndices_",
                "type": "uint128[]",
                "internalType": "uint128[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEffectivePriceForTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "assetPrice",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "longTradingExpo",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accumulator",
                "type": "tuple",
                "internalType": "struct HugeUint.Uint512",
                "components": [
                    {
                        "name": "hi",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lo",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getEffectivePriceForTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEffectiveTickForPrice",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEffectiveTickForPrice",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "assetPrice",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "longTradingExpo",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accumulator",
                "type": "tuple",
                "internalType": "struct HugeUint.Uint512",
                "components": [
                    {
                        "name": "hi",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lo",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "tickSpacing",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getLongPosition",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "pos_",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.Position",
                "components": [
                    {
                        "name": "validated",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "totalExpo",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "amount",
                        "type": "uint128",
                        "internalType": "uint128"
                    }
                ]
            },
            {
                "name": "liquidationPenalty_",
                "type": "uint24",
                "internalType": "uint24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPositionValue",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "value_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTickLiquidationPenalty",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "liquidationPenalty_",
                "type": "uint24",
                "internalType": "uint24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserPendingAction",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "action_",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PendingAction",
                "components": [
                    {
                        "name": "action",
                        "type": "uint8",
                        "internalType": "enum IUsdnProtocolTypes.ProtocolAction"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "validator",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "securityDepositValue",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "var1",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "var2",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var3",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "var4",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var5",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var6",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "var7",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "grantRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "hasRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "depositAmount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "longAmount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "desiredLiqPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initializeStorage",
        "inputs": [
            {
                "name": "usdn",
                "type": "address",
                "internalType": "contract IUsdn"
            },
            {
                "name": "sdex",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            },
            {
                "name": "asset",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            },
            {
                "name": "oracleMiddleware",
                "type": "address",
                "internalType": "contract IBaseOracleMiddleware"
            },
            {
                "name": "liquidationRewardsManager",
                "type": "address",
                "internalType": "contract IBaseLiquidationRewardsManager"
            },
            {
                "name": "tickSpacing",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "feeCollector",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "managers",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.Managers",
                "components": [
                    {
                        "name": "setExternalManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "criticalFunctionsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "setProtocolParamsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "setUsdnParamsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "setOptionsManager",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "proxyUpgradeManager",
                        "type": "address",
                        "internalType": "address"
                    }
                ]
            },
            {
                "name": "protocolFallback",
                "type": "address",
                "internalType": "contract IUsdnProtocolFallback"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "initializeV2",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "initiateClosePosition",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "amountToClose",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initiateDeposit",
        "inputs": [
            {
                "name": "amount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "permit2TokenBitfield",
                "type": "uint8",
                "internalType": "Permit2TokenBitfield.Bitfield"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initiateOpenPosition",
        "inputs": [
            {
                "name": "amount",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "desiredLiqPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "permit2TokenBitfield",
                "type": "uint8",
                "internalType": "Permit2TokenBitfield.Bitfield"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "posId_",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "initiateWithdrawal",
        "inputs": [
            {
                "name": "usdnShares",
                "type": "uint152",
                "internalType": "uint152"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "liquidate",
        "inputs": [
            {
                "name": "currentPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "iterations",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [
            {
                "name": "liquidatedPositions_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "longAssetAvailableWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "available_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "longTradingExpoWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "expo_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "maxTick",
        "inputs": [],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "minTick",
        "inputs": [],
        "outputs": [
            {
                "name": "tick_",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "newVariable",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingDefaultAdmin",
        "inputs": [],
        "outputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingDefaultAdminDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "internalType": "uint48"
            },
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proxiableUUID",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "retBool",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "rollbackDefaultAdminDelay",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tickHash",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "version",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "transferPositionOwnership",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "upgradeToAndCall",
        "inputs": [
            {
                "name": "newImplementation",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "usdnPrice",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "usdnPrice",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "validateActionablePendingActions",
        "inputs": [
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            },
            {
                "name": "maxValidations",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "validatedActions_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateClosePosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "closePriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateDeposit",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "depositPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateOpenPosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "openPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "validateWithdrawal",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "withdrawalPriceData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "previousActionsData",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.PreviousActionsData",
                "components": [
                    {
                        "name": "priceData",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    },
                    {
                        "name": "rawIndices",
                        "type": "uint128[]",
                        "internalType": "uint128[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "success_",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "vaultAssetAvailableWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "available_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "vaultTradingExpoWithFunding",
        "inputs": [
            {
                "name": "currentPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "expo_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "BurnSdexOnDepositRatioUpdated",
        "inputs": [
            {
                "name": "newRatio",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminDelayChangeCanceled",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminDelayChangeScheduled",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            },
            {
                "name": "effectSchedule",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminTransferCanceled",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminTransferScheduled",
        "inputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "acceptSchedule",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EMAPeriodUpdated",
        "inputs": [
            {
                "name": "newEMAPeriod",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeBpsUpdated",
        "inputs": [
            {
                "name": "feeBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeCollectorUpdated",
        "inputs": [
            {
                "name": "feeCollector",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeThresholdUpdated",
        "inputs": [
            {
                "name": "feeThreshold",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FundingSFUpdated",
        "inputs": [
            {
                "name": "newFundingSF",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "HighestPopulatedTickUpdated",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "indexed": false,
                "internalType": "int24"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ImbalanceLimitsUpdated",
        "inputs": [
            {
                "name": "newOpenLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newDepositLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newWithdrawalLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newCloseLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newRebalancerCloseLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newLongImbalanceTargetBps",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedClosePosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "originalAmount",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "amountToClose",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "totalExpoRemaining",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedDeposit",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "sdexBurned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedOpenPosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "timestamp",
                "type": "uint40",
                "indexed": false,
                "internalType": "uint40"
            },
            {
                "name": "totalExpo",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "amount",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "startPrice",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedWithdrawal",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "usdnAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LastFundingPerDayUpdated",
        "inputs": [
            {
                "name": "lastFundingPerDay",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            },
            {
                "name": "lastUpdateTimestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatedPosition",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "liquidationPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "effectiveTickPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatedTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "indexed": true,
                "internalType": "int24"
            },
            {
                "name": "oldTickVersion",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "liquidationPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "effectiveTickPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "remainingCollateral",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationIterationUpdated",
        "inputs": [
            {
                "name": "newLiquidationIteration",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationPenaltyUpdated",
        "inputs": [
            {
                "name": "newLiquidationPenalty",
                "type": "uint24",
                "indexed": false,
                "internalType": "uint24"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationPriceUpdated",
        "inputs": [
            {
                "name": "oldPosId",
                "type": "tuple",
                "indexed": true,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "newPosId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationRewardsManagerUpdated",
        "inputs": [
            {
                "name": "newAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatorRewarded",
        "inputs": [
            {
                "name": "liquidator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "rewards",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MaxLeverageUpdated",
        "inputs": [
            {
                "name": "newMaxLeverage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MinLeverageUpdated",
        "inputs": [
            {
                "name": "newMinLeverage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MinLongPositionUpdated",
        "inputs": [
            {
                "name": "minLongPosition",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OracleMiddlewareUpdated",
        "inputs": [
            {
                "name": "newMiddleware",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PositionFeeUpdated",
        "inputs": [
            {
                "name": "positionFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PositionOwnershipTransferred",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "indexed": true,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "oldOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProtocolFeeDistributed",
        "inputs": [
            {
                "name": "feeCollector",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RebalancerBonusUpdated",
        "inputs": [
            {
                "name": "bonus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RebalancerUpdated",
        "inputs": [
            {
                "name": "newAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "previousAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "newAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SafetyMarginBpsUpdated",
        "inputs": [
            {
                "name": "newSafetyMargin",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SecurityDepositRefunded",
        "inputs": [
            {
                "name": "pendingActionValidator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "receivedBy",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SecurityDepositValueUpdated",
        "inputs": [
            {
                "name": "securityDepositValue",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "StalePendingActionRemoved",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TargetUsdnPriceUpdated",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Upgraded",
        "inputs": [
            {
                "name": "implementation",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UsdnRebaseIntervalUpdated",
        "inputs": [
            {
                "name": "interval",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UsdnRebaseThresholdUpdated",
        "inputs": [
            {
                "name": "threshold",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedClosePosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "amountReceived",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "profit",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedDeposit",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amountDeposited",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "usdnMinted",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedOpenPosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "totalExpo",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "newStartPrice",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedWithdrawal",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amountWithdrawn",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "usdnBurned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidationDeadlineUpdated",
        "inputs": [
            {
                "name": "newValidationDeadline",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VaultFeeUpdated",
        "inputs": [
            {
                "name": "vaultFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AccessControlBadConfirmation",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccessControlEnforcedDefaultAdminDelay",
        "inputs": [
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessControlEnforcedDefaultAdminRules",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccessControlInvalidDefaultAdmin",
        "inputs": [
            {
                "name": "defaultAdmin",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessControlUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "neededRole",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardInvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardReentrantCall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardUninitialized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotInitializing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SafeCastOverflowedUintDowncast",
        "inputs": [
            {
                "name": "bits",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UnauthorizedCallContext",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UpgradeFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolAmountToCloseHigherThanPositionAmount",
        "inputs": [
            {
                "name": "amountToClose",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "positionAmount",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolDepositTooSmall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolEtherRefundFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolImbalanceLimitReached",
        "inputs": [
            {
                "name": "imbalanceBps",
                "type": "int256",
                "internalType": "int256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInsufficientOracleFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAddressTo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAddressValidator",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAssetDecimals",
        "inputs": [
            {
                "name": "assetDecimals",
                "type": "uint8",
                "internalType": "uint8"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidBurnSdexOnDepositRatio",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidEMAPeriod",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidExpoImbalanceLimit",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidFeeCollector",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidFundingSF",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationIteration",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationPenalty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationPrice",
        "inputs": [
            {
                "name": "liquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "startPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationRewardsManagerAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLongExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLongImbalanceTarget",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMaxLeverage",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMiddlewareAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMinLeverage",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPendingActionData",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPositionFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidProtocolFeeBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidRebalancerBonus",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidRebalancerTick",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidSafetyMarginBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidTargetUsdnPrice",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidTokenDecimals",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidUsdn",
        "inputs": [
            {
                "name": "usdnAddress",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidUsdnRebaseThreshold",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidValidationDeadline",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidVaultExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidVaultFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLeverageTooHigh",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLeverageTooLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLiquidationPriceSafetyMargin",
        "inputs": [
            {
                "name": "liquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "maxLiquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolLongPositionTooSmall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolMinInitAmount",
        "inputs": [
            {
                "name": "minInitAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolNoPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolOutdatedTick",
        "inputs": [
            {
                "name": "currentVersion",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "providedVersion",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolPositionNotValidated",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolSecurityDepositTooLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolTimestampTooOld",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolUnauthorized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolUnexpectedBalance",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroAmount",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroLongTradingExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroTotalExpo",
        "inputs": []
    },{
        "type": "function",
        "name": "ADMIN_CRITICAL_FUNCTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_PROXY_UPGRADE_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_EXTERNAL_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_OPTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_PROTOCOL_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ADMIN_SET_USDN_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "BPS_DIVISOR",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "CRITICAL_FUNCTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DEAD_ADDRESS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "FUNDING_RATE_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "FUNDING_SF_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "LEVERAGE_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "LIQUIDATION_MULTIPLIER_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "MAX_ACTIONABLE_PENDING_ACTIONS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "MAX_LIQUIDATION_ITERATION",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "MIN_INIT_DEPOSIT",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "MIN_USDN_SUPPLY",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "NO_POSITION_TICK",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "PROXY_UPGRADE_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SDEX_BURN_ON_DEPOSIT_DIVISOR",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "SET_EXTERNAL_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_OPTIONS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_PROTOCOL_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SET_USDN_PARAMS_ROLE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "TOKENS_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "acceptDefaultAdminTransfer",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "beginDefaultAdminTransfer",
        "inputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "cancelDefaultAdminTransfer",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "changeDefaultAdminDelay",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "defaultAdmin",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "defaultAdminDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "defaultAdminDelayIncreaseWait",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAsset",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAssetDecimals",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBalanceLong",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBalanceVault",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCloseExpoImbalanceLimitBps",
        "inputs": [],
        "outputs": [
            {
                "name": "closeExpoImbalanceLimitBps_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCurrentLongPosition",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            },
            {
                "name": "index",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.Position",
                "components": [
                    {
                        "name": "validated",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint40",
                        "internalType": "uint40"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "totalExpo",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "amount",
                        "type": "uint128",
                        "internalType": "uint128"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDepositExpoImbalanceLimitBps",
        "inputs": [],
        "outputs": [
            {
                "name": "depositExpoImbalanceLimitBps_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEMA",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEMAPeriod",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFallbackAddress",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFeeCollector",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFeeThreshold",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFundingSF",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getHighestPopulatedTick",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLastFundingPerDay",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLastPrice",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLastRebaseCheck",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLastUpdateTimestamp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLiqMultiplierAccumulator",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct HugeUint.Uint512",
                "components": [
                    {
                        "name": "hi",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lo",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLiquidationIteration",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLiquidationPenalty",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint24",
                "internalType": "uint24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLiquidationRewardsManager",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IBaseLiquidationRewardsManager"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLongImbalanceTargetBps",
        "inputs": [],
        "outputs": [
            {
                "name": "longImbalanceTargetBps_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMaxLeverage",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMiddlewareValidationDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMinLeverage",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMinLongPosition",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getOpenExpoImbalanceLimitBps",
        "inputs": [],
        "outputs": [
            {
                "name": "openExpoImbalanceLimitBps_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getOracleMiddleware",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IBaseOracleMiddleware"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPendingBalanceVault",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPendingProtocolFee",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPositionFeeBps",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPriceFeedDecimals",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getProtocolFeeBps",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRebalancer",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IBaseRebalancer"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRebalancerBonusBps",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRebalancerCloseExpoImbalanceLimitBps",
        "inputs": [],
        "outputs": [
            {
                "name": "rebalancerCloseExpoImbalanceLimitBps_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSafetyMarginBps",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSdex",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSdexBurnOnDepositRatio",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSecurityDepositValue",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTargetUsdnPrice",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTickData",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct IUsdnProtocolTypes.TickData",
                "components": [
                    {
                        "name": "totalExpo",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalPos",
                        "type": "uint248",
                        "internalType": "uint248"
                    },
                    {
                        "name": "liquidationPenalty",
                        "type": "uint24",
                        "internalType": "uint24"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTickSpacing",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTickVersion",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "internalType": "int24"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalExpo",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalLongPositions",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUsdn",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IUsdn"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUsdnMinDivisor",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUsdnRebaseInterval",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUsdnRebaseThreshold",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getValidationDeadline",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getVaultFeeBps",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getWithdrawalExpoImbalanceLimitBps",
        "inputs": [],
        "outputs": [
            {
                "name": "withdrawalExpoImbalanceLimitBps_",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "grantRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "hasRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingDefaultAdmin",
        "inputs": [],
        "outputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingDefaultAdminDelay",
        "inputs": [],
        "outputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "internalType": "uint48"
            },
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "previewDeposit",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "price",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "usdnSharesExpected_",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "sdexToBurn_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "previewWithdraw",
        "inputs": [
            {
                "name": "usdnShares",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "price",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [
            {
                "name": "assetExpected_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "removeBlockedPendingAction",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "removeBlockedPendingAction",
        "inputs": [
            {
                "name": "rawIndex",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "removeBlockedPendingActionNoCleanup",
        "inputs": [
            {
                "name": "rawIndex",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "removeBlockedPendingActionNoCleanup",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "rollbackDefaultAdminDelay",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setEMAPeriod",
        "inputs": [
            {
                "name": "newEMAPeriod",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setExpoImbalanceLimits",
        "inputs": [
            {
                "name": "newOpenLimitBps",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "newDepositLimitBps",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "newWithdrawalLimitBps",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "newCloseLimitBps",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "newRebalancerCloseLimitBps",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "newLongImbalanceTargetBps",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setFeeCollector",
        "inputs": [
            {
                "name": "newFeeCollector",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setFeeThreshold",
        "inputs": [
            {
                "name": "newFeeThreshold",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setFundingSF",
        "inputs": [
            {
                "name": "newFundingSF",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setLiquidationIteration",
        "inputs": [
            {
                "name": "newLiquidationIteration",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setLiquidationPenalty",
        "inputs": [
            {
                "name": "newLiquidationPenalty",
                "type": "uint24",
                "internalType": "uint24"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setLiquidationRewardsManager",
        "inputs": [
            {
                "name": "newLiquidationRewardsManager",
                "type": "address",
                "internalType": "contract IBaseLiquidationRewardsManager"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setMaxLeverage",
        "inputs": [
            {
                "name": "newMaxLeverage",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setMinLeverage",
        "inputs": [
            {
                "name": "newMinLeverage",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setMinLongPosition",
        "inputs": [
            {
                "name": "newMinLongPosition",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setOracleMiddleware",
        "inputs": [
            {
                "name": "newOracleMiddleware",
                "type": "address",
                "internalType": "contract IBaseOracleMiddleware"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setPositionFeeBps",
        "inputs": [
            {
                "name": "newPositionFee",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setProtocolFeeBps",
        "inputs": [
            {
                "name": "newProtocolFeeBps",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setRebalancer",
        "inputs": [
            {
                "name": "newRebalancer",
                "type": "address",
                "internalType": "contract IBaseRebalancer"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setRebalancerBonusBps",
        "inputs": [
            {
                "name": "newBonus",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setSafetyMarginBps",
        "inputs": [
            {
                "name": "newSafetyMarginBps",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setSdexBurnOnDepositRatio",
        "inputs": [
            {
                "name": "newRatio",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setSecurityDepositValue",
        "inputs": [
            {
                "name": "securityDepositValue",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setTargetUsdnPrice",
        "inputs": [
            {
                "name": "newPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setUsdnRebaseInterval",
        "inputs": [
            {
                "name": "newInterval",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setUsdnRebaseThreshold",
        "inputs": [
            {
                "name": "newThreshold",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setValidationDeadline",
        "inputs": [
            {
                "name": "newValidationDeadline",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setVaultFeeBps",
        "inputs": [
            {
                "name": "newVaultFee",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "BurnSdexOnDepositRatioUpdated",
        "inputs": [
            {
                "name": "newRatio",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminDelayChangeCanceled",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminDelayChangeScheduled",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            },
            {
                "name": "effectSchedule",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminTransferCanceled",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DefaultAdminTransferScheduled",
        "inputs": [
            {
                "name": "newAdmin",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "acceptSchedule",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EMAPeriodUpdated",
        "inputs": [
            {
                "name": "newEMAPeriod",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeBpsUpdated",
        "inputs": [
            {
                "name": "feeBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeCollectorUpdated",
        "inputs": [
            {
                "name": "feeCollector",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FeeThresholdUpdated",
        "inputs": [
            {
                "name": "feeThreshold",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FundingSFUpdated",
        "inputs": [
            {
                "name": "newFundingSF",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "HighestPopulatedTickUpdated",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "indexed": false,
                "internalType": "int24"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ImbalanceLimitsUpdated",
        "inputs": [
            {
                "name": "newOpenLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newDepositLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newWithdrawalLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newCloseLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newRebalancerCloseLimitBps",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newLongImbalanceTargetBps",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedClosePosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "originalAmount",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "amountToClose",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "totalExpoRemaining",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedDeposit",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "sdexBurned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedOpenPosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "timestamp",
                "type": "uint40",
                "indexed": false,
                "internalType": "uint40"
            },
            {
                "name": "totalExpo",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "amount",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "startPrice",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitiatedWithdrawal",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "usdnAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LastFundingPerDayUpdated",
        "inputs": [
            {
                "name": "lastFundingPerDay",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            },
            {
                "name": "lastUpdateTimestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatedPosition",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "liquidationPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "effectiveTickPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatedTick",
        "inputs": [
            {
                "name": "tick",
                "type": "int24",
                "indexed": true,
                "internalType": "int24"
            },
            {
                "name": "oldTickVersion",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "liquidationPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "effectiveTickPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "remainingCollateral",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationIterationUpdated",
        "inputs": [
            {
                "name": "newLiquidationIteration",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationPenaltyUpdated",
        "inputs": [
            {
                "name": "newLiquidationPenalty",
                "type": "uint24",
                "indexed": false,
                "internalType": "uint24"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationPriceUpdated",
        "inputs": [
            {
                "name": "oldPosId",
                "type": "tuple",
                "indexed": true,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "newPosId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidationRewardsManagerUpdated",
        "inputs": [
            {
                "name": "newAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidatorRewarded",
        "inputs": [
            {
                "name": "liquidator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "rewards",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MaxLeverageUpdated",
        "inputs": [
            {
                "name": "newMaxLeverage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MinLeverageUpdated",
        "inputs": [
            {
                "name": "newMinLeverage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MinLongPositionUpdated",
        "inputs": [
            {
                "name": "minLongPosition",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OracleMiddlewareUpdated",
        "inputs": [
            {
                "name": "newMiddleware",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PositionFeeUpdated",
        "inputs": [
            {
                "name": "positionFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PositionOwnershipTransferred",
        "inputs": [
            {
                "name": "posId",
                "type": "tuple",
                "indexed": true,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "oldOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProtocolFeeDistributed",
        "inputs": [
            {
                "name": "feeCollector",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RebalancerBonusUpdated",
        "inputs": [
            {
                "name": "bonus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RebalancerUpdated",
        "inputs": [
            {
                "name": "newAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "previousAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "newAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SafetyMarginBpsUpdated",
        "inputs": [
            {
                "name": "newSafetyMargin",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SecurityDepositRefunded",
        "inputs": [
            {
                "name": "pendingActionValidator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "receivedBy",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SecurityDepositValueUpdated",
        "inputs": [
            {
                "name": "securityDepositValue",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "StalePendingActionRemoved",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TargetUsdnPriceUpdated",
        "inputs": [
            {
                "name": "price",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UsdnRebaseIntervalUpdated",
        "inputs": [
            {
                "name": "interval",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UsdnRebaseThresholdUpdated",
        "inputs": [
            {
                "name": "threshold",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedClosePosition",
        "inputs": [
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "amountReceived",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "profit",
                "type": "int256",
                "indexed": false,
                "internalType": "int256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedDeposit",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amountDeposited",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "usdnMinted",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedOpenPosition",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "totalExpo",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "newStartPrice",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "posId",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IUsdnProtocolTypes.PositionId",
                "components": [
                    {
                        "name": "tick",
                        "type": "int24",
                        "internalType": "int24"
                    },
                    {
                        "name": "tickVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidatedWithdrawal",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "validator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amountWithdrawn",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "usdnBurned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidationDeadlineUpdated",
        "inputs": [
            {
                "name": "newValidationDeadline",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VaultFeeUpdated",
        "inputs": [
            {
                "name": "vaultFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AccessControlBadConfirmation",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccessControlEnforcedDefaultAdminDelay",
        "inputs": [
            {
                "name": "schedule",
                "type": "uint48",
                "internalType": "uint48"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessControlEnforcedDefaultAdminRules",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccessControlInvalidDefaultAdmin",
        "inputs": [
            {
                "name": "defaultAdmin",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessControlUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "neededRole",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardInvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardReentrantCall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InitializableReentrancyGuardUninitialized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotInitializing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SafeCastOverflowedUintDowncast",
        "inputs": [
            {
                "name": "bits",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "SafeCastOverflowedUintToInt",
        "inputs": [
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolAmountToCloseHigherThanPositionAmount",
        "inputs": [
            {
                "name": "amountToClose",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "positionAmount",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolDepositTooSmall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolEtherRefundFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolImbalanceLimitReached",
        "inputs": [
            {
                "name": "imbalanceBps",
                "type": "int256",
                "internalType": "int256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInsufficientOracleFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAddressTo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAddressValidator",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidAssetDecimals",
        "inputs": [
            {
                "name": "assetDecimals",
                "type": "uint8",
                "internalType": "uint8"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidBurnSdexOnDepositRatio",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidEMAPeriod",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidExpoImbalanceLimit",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidFeeCollector",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidFundingSF",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationIteration",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationPenalty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationPrice",
        "inputs": [
            {
                "name": "liquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "startPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLiquidationRewardsManagerAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLongExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidLongImbalanceTarget",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMaxLeverage",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMiddlewareAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidMinLeverage",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPendingActionData",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidPositionFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidProtocolFeeBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidRebalancerBonus",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidRebalancerTick",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidSafetyMarginBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidTargetUsdnPrice",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidTokenDecimals",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidUsdn",
        "inputs": [
            {
                "name": "usdnAddress",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidUsdnRebaseThreshold",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidValidationDeadline",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidVaultExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolInvalidVaultFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLeverageTooHigh",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLeverageTooLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolLiquidationPriceSafetyMargin",
        "inputs": [
            {
                "name": "liquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "maxLiquidationPrice",
                "type": "uint128",
                "internalType": "uint128"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolLongPositionTooSmall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolMinInitAmount",
        "inputs": [
            {
                "name": "minInitAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolNoPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolOutdatedTick",
        "inputs": [
            {
                "name": "currentVersion",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "providedVersion",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "UsdnProtocolPendingAction",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolPositionNotValidated",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolSecurityDepositTooLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolTimestampTooOld",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolUnauthorized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolUnexpectedBalance",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroAmount",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroLongTradingExpo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UsdnProtocolZeroTotalExpo",
        "inputs": []
    }
] as const;