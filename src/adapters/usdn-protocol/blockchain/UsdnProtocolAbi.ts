export const abi = [
    {
        type: 'function',
        name: 'getHighestPopulatedTick',
        inputs: [],
        outputs: [{ name: '', type: 'int24', internalType: 'int24' }],
        stateMutability: 'view',
    },
    {
        type: 'event',
        name: 'HighestPopulatedTickUpdated',
        inputs: [
            {
                name: 'tick',
                type: 'int24',
                indexed: false,
                internalType: 'int24',
            },
        ],
        anonymous: false,
    },
] as const;
