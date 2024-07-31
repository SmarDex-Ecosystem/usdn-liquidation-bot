import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['src/**/*.test.ts'],
        testTimeout: 3000,
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
        setupFiles: 'dotenv/config',
    },
});
