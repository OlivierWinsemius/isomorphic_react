const merge = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');

const dist = path.resolve(__dirname, 'dist', 'prod');

module.exports = merge(common, {
    mode: 'production',

    entry: {
        app: path.resolve(__dirname, 'client', 'index.js'),
    },

    output: {
        path: path.resolve(__dirname, dist),
        publicPath: 'http://localhost:3000/build/',
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, dist)]),
    ],
});
