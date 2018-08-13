const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist', 'dev', 'client'),
    },

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist', 'dev', 'client'),
        port: 3000,
        proxy: {
            '/api': 'http://localhost:4000',
        },
    },

    watch: true,
});
