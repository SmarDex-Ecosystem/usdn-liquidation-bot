

export const IMockWstEthOracleMiddleware = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "pythContract",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "pythFeedId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "chainlinkPriceFeed",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "wsteth",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "chainlinkTimeElapsedLimit",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "ADMIN_ROLE",
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
                "type": "uint16",
                "internalType": "uint16"
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
        "name": "MAX_CONF_RATIO",
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
        "name": "PAUSABLE_ROLE",
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
        "name": "PRICE_TOO_OLD",
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
        "name": "getChainlinkDecimals",
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
        "name": "getChainlinkTimeElapsedLimit",
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
        "name": "getConfRatioBps",
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
        "name": "getDecimals",
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
        "name": "getLowLatencyDelay",
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
        "name": "getPriceFeed",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract AggregatorV3Interface"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPyth",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IPyth"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPythFeedId",
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
        "name": "getPythRecentPriceDelay",
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
        "name": "getValidationDelay",
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
        "name": "getVerifySignature",
        "inputs": [],
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
        "name": "getWstethMockedConfBps",
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
        "name": "getWstethMockedPrice",
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
        "name": "parseAndValidatePrice",
        "inputs": [
            {
                "name": "actionId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "targetTimestamp",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "action",
                "type": "uint8",
                "internalType": "enum IUsdnProtocolTypes.ProtocolAction"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "price_",
                "type": "tuple",
                "internalType": "struct PriceInfo",
                "components": [
                    {
                        "name": "price",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "neutralPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "timestamp",
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
        "name": "pausePriceValidation",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [],
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
        "name": "setChainlinkTimeElapsedLimit",
        "inputs": [
            {
                "name": "newTimeElapsedLimit",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setConfRatio",
        "inputs": [
            {
                "name": "newConfRatio",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setLowLatencyDelay",
        "inputs": [
            {
                "name": "newLowLatencyDelay",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setPythRecentPriceDelay",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setValidationDelay",
        "inputs": [
            {
                "name": "newValidationDelay",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setVerifySignature",
        "inputs": [
            {
                "name": "verify",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setWstethMockedConfBps",
        "inputs": [
            {
                "name": "newWstethMockedConfPct",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setWstethMockedPrice",
        "inputs": [
            {
                "name": "newWstethMockedPrice",
                "type": "uint256",
                "internalType": "uint256"
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
        "type": "function",
        "name": "unpausePriceValidation",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "validationCost",
        "inputs": [
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "action",
                "type": "uint8",
                "internalType": "enum IUsdnProtocolTypes.ProtocolAction"
            }
        ],
        "outputs": [
            {
                "name": "result_",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdrawEther",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "ConfRatioUpdated",
        "inputs": [
            {
                "name": "newConfRatio",
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
        "name": "LowLatencyDelayUpdated",
        "inputs": [
            {
                "name": "newLowLatencyDelay",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PenaltyBpsUpdated",
        "inputs": [
            {
                "name": "newPenaltyBps",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PythRecentPriceDelayUpdated",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RedstoneRecentPriceDelayUpdated",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint48",
                "indexed": false,
                "internalType": "uint48"
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
        "name": "TimeElapsedLimitUpdated",
        "inputs": [
            {
                "name": "newTimeElapsedLimit",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ValidationDelayUpdated",
        "inputs": [
            {
                "name": "newValidationDelay",
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
        "name": "EnforcedPause",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ExpectedPause",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareConfRatioTooHigh",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareIncorrectFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareInvalidLowLatencyDelay",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareInvalidPenaltyBps",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareInvalidRecentPriceDelay",
        "inputs": [
            {
                "name": "newDelay",
                "type": "uint64",
                "internalType": "uint64"
            }
        ]
    },
    {
        "type": "error",
        "name": "OracleMiddlewareInvalidRoundId",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewarePriceTooOld",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "OracleMiddlewarePriceTooRecent",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "OracleMiddlewarePythFeeSafeguard",
        "inputs": [
            {
                "name": "fee",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "OracleMiddlewarePythPositiveExponent",
        "inputs": [
            {
                "name": "expo",
                "type": "int32",
                "internalType": "int32"
            }
        ]
    },
    {
        "type": "error",
        "name": "OracleMiddlewareRedstoneSafeguard",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareTransferFailed",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OracleMiddlewareTransferToZeroAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OracleMiddlewareWrongPrice",
        "inputs": [
            {
                "name": "price",
                "type": "int256",
                "internalType": "int256"
            }
        ]
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
    }
] as const;
