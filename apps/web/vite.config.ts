/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
});
