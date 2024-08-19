export const IUsdnProtocolAbi = [
    {
        type: 'function',
        name: 'liquidate',
        inputs: [
            {
                name: 'currentPriceData',
                type: 'bytes',
                internalType: 'bytes',
            },
            {
                name: 'iterations',
                type: 'uint16',
                internalType: 'uint16',
            },
        ],
        outputs: [
            {
                name: 'liquidatedPositions_',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'payable',
    },
] as const;
