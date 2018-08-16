import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import common from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
        publicPath: '/',
    },

    devtool: 'eval-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
