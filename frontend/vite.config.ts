import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/ws': {
                target: 'ws://localhost:3001',
                ws: true,
                rewrite: (path) => path,
            },
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                practice: 'practice.html'
            }
        }
    }
});
