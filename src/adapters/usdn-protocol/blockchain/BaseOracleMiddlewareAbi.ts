/** @var abi ABI of the minimum implementation of the OracleMiddleware contract */
export const abi = [
    {
        type: 'function',
        name: 'getValidationDelay',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getLowLatencyDelay',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint16',
                internalType: 'uint16',
            },
        ],
        stateMutability: 'view',
    },
] as const;
