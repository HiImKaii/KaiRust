import { defineConfig, type Plugin } from 'vite';

// Plugin để ẩn /index.html khỏi URL (redirect 302 thay vì rewrite nội bộ)
function cleanUrlPlugin(): Plugin {
    return {
        name: 'clean-url',
        configureServer(server) {
            server.middlewares.use((req: any, res: any, next: any) => {
                // Nếu URL là /index.html thì redirect 302 về /
                if (req.url === '/index.html') {
                    res.writeHead(302, { Location: '/' });
                    res.end();
                    return;
                }
                next();
            });
        },
    };
}

export default defineConfig({
    plugins: [cleanUrlPlugin()],
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
