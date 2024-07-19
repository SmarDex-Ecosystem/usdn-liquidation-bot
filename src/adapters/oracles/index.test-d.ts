import { describe, expectTypeOf, it } from 'vitest';
import type IOracleAdapter from './IOracleAdapter.ts';

describe('adapters/oracles/index', () => {
    it('should export instances of IOracleAdapter', async () => {
        const adapters = await import('./index.js');
        for (const oracle of Object.values(adapters)) {
            expectTypeOf(oracle).toEqualTypeOf<IOracleAdapter>();
        }
    });
});
