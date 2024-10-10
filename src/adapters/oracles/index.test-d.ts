import { describe, expectTypeOf, it } from 'vitest';
import type { AHighLatencyOracle, ALowLatencyOracle } from './AOracleAdapter.ts';

describe('adapters/oracles/index', () => {
    it('should export instances of OracleAdapter', async () => {
        const adapters = await import('./index.js');
        for (const oracle of Object.values(adapters)) {
            expectTypeOf(oracle).toMatchTypeOf<ALowLatencyOracle | AHighLatencyOracle>();
        }
    });
});
