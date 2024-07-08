import { defineConfig, mergeConfig } from 'vitest/config';

import vitestConfig from '../../vitest.config.js';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['tests/**/*.test.ts'],
      testTimeout: 3000,
    },
  }),
);
