const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        // createProxyMiddleware('/api', { // 遇见/api前缀，触发代理
        //     target: 'http://localhost:8000',
        //     changeOrigin: true, // 控制请求地址
        //     pathRewrite: { '^/api': '' }
        // }),
        createProxyMiddleware('/api_02', {
            target: 'http://localhost:8001',
            changeOrigin: true,
            pathRewrite: { '^/api_02': '' }
        })
    )
}