const merge = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');

const dist = path.resolve(__dirname, 'dist', 'prod');

module.exports = merge(common, {
    mode: 'production',

    entry: {
        app: path.resolve(__dirname, 'client', 'index.js'),
    },

    output: {
        path: path.resolve(__dirname, dist),
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        }),
    ],
});
