const target = 'http://127.0.0.1:3000';

module.exports = {
    devServer: {
        port: 8080,
        poxy:{
            '^/api': {
                target,
                changeOrigin: true
            }
        }
    }
}