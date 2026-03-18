import { defineConfig, type Plugin } from 'vite';

// Plugin để ẩn /index.html khỏi URL (redirect 302 thay vì rewrite nội bộ)
function cleanUrlPlugin(): Plugin {
    return {
        name: 'clean-url',
        configureServer(server) {
            server.middlewares.use((req: any, res: any, next: any) => {
                const url = req.url || '';
                
                // 1. Nếu URL là /index.html thì redirect về /
                if (url === '/index.html') {
                    res.writeHead(301, { Location: '/' });
                    res.end();
                    return;
                }

                // 2. Nếu người dùng gõ trực tiếp .html (ví dụ /practice.html) thì chuyển về /practice
                // Chỉ áp dụng cho các tệp HTML không phải index.html
                if (url.endsWith('.html')) {
                    const cleanPath = url.replace(/\.html(\?.*)?$/, '$1');
                    res.writeHead(301, { Location: cleanPath });
                    res.end();
                    return;
                }

                // 3. Nếu request không có đuôi (ví dụ /practice) thì rewrite nội bộ sang .html
                // để Vite có thể tìm thấy file practice.html mà URL vẫn đẹp
                // Loại trừ các tệp tĩnh có dấu chấm (như .js, .css, .png) và các internal paths của Vite (/@...)
                // và loại trừ /api/* và /ws/* vì đây là proxy endpoint
                const [path, query] = url.split('?');
                if (!path.includes('.') && path !== '/' && !path.startsWith('/@') && !path.startsWith('/api') && !path.startsWith('/ws')) {
                    req.url = path + '.html' + (query ? '?' + query : '');
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
