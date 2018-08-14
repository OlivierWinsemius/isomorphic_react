const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = path.resolve(__dirname, 'dist', 'dev');

module.exports = merge(common, {
    mode: 'development',

    entry: {
        app: [
            'webpack-hot-middleware/client',
            path.resolve(__dirname, 'client', 'index.js'),
        ],
    },

    output: {
        path: path.resolve(__dirname, dist),
    },

    devtool: 'eval-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
