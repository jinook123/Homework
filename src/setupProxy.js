const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/business-service', {
             target: 'http://localhost:8080/',
            // target: 'http://90.90.130.31/',
            changeOrigin: true,
        }),
    );
};
