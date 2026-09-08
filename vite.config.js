import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    // Relative asset URLs also work inside ChatGPT's embedded Site preview.
    base: './',
    plugins: [react()],
});
