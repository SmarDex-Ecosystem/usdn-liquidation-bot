export const abi = [
    {
        type: 'function',
        name: 'getHighestPopulatedTick',
        inputs: [],
        outputs: [{ name: '', type: 'int24', internalType: 'int24' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getActionablePendingActions',
        inputs: [
            {
                name: 'currentUser',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: 'actions_',
                type: 'tuple[]',
                internalType: 'struct IUsdnProtocolTypes.PendingAction[]',
                components: [
                    {
                        name: 'action',
                        type: 'uint8',
                        internalType: 'enum IUsdnProtocolTypes.ProtocolAction',
                    },
                    {
                        name: 'timestamp',
                        type: 'uint40',
                        internalType: 'uint40',
                    },
                    {
                        name: 'to',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'validator',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'securityDepositValue',
                        type: 'uint64',
                        internalType: 'uint64',
                    },
                    {
                        name: 'var1',
                        type: 'int24',
                        internalType: 'int24',
                    },
                    {
                        name: 'var2',
                        type: 'uint128',
                        internalType: 'uint128',
                    },
                    {
                        name: 'var3',
                        type: 'uint128',
                        internalType: 'uint128',
                    },
                    {
                        name: 'var4',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'var5',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'var6',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'var7',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            {
                name: 'rawIndices_',
                type: 'uint128[]',
                internalType: 'uint128[]',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'liquidate',
        inputs: [
            {
                name: 'currentPriceData',
                type: 'bytes',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                name: 'liquidatedTicks_',
                type: 'tuple[]',
                internalType: 'struct IUsdnProtocolTypes.LiqTickInfo[]',
                components: [
                    {
                        name: 'totalPositions',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalExpo',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'remainingCollateral',
                        type: 'int256',
                        internalType: 'int256',
                    },
                    {
                        name: 'tickPrice',
                        type: 'uint128',
                        internalType: 'uint128',
                    },
                    {
                        name: 'priceWithoutPenalty',
                        type: 'uint128',
                        internalType: 'uint128',
                    },
                ],
            },
        ],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'validateActionablePendingActions',
        inputs: [
            {
                name: 'previousActionsData',
                type: 'tuple',
                internalType: 'struct IUsdnProtocolTypes.PreviousActionsData',
                components: [
                    {
                        name: 'priceData',
                        type: 'bytes[]',
                        internalType: 'bytes[]',
                    },
                    {
                        name: 'rawIndices',
                        type: 'uint128[]',
                        internalType: 'uint128[]',
                    },
                ],
            },
            {
                name: 'maxValidations',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'validatedActions_',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'payable',
    },
] as const;
