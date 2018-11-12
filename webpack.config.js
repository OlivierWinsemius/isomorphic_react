// FOR DEVELOPMENT ONLY: USES WEBPACK DEVSERVER
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = path.resolve(__dirname, 'dist', 'dev');

module.exports = {
    mode: 'development',

    output: {
        filename: '[name].js',
    },

    entry: {
        app: path.resolve(__dirname, 'client', 'index.js'),
    },

    devServer: {
        hot: true,
        port: 8080,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },

    output: {
        path: path.resolve(__dirname, dist),
    },

    resolve: {
        modules: ['./client', './node_modules'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.gql$/,
                exclude: /node_modules/,
                use: {
                    loader: 'graphql-tag/loader',
                },
            },
        ],
    },

    devtool: 'eval-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
    ],
};
