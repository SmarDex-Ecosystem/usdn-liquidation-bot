import { defineConfig } from 'vitest/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
    test: {
        include: ['src/**/*.test.ts'],
        testTimeout: 3000,
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
        setupFiles: ['./vitest.setup.ts'],
    },
});
