const ReactLoadablePlugin = require('react-loadable/webpack')
    .ReactLoadablePlugin;
const webpack = require('webpack');

module.exports = {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
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

    plugins: [
        new ReactLoadablePlugin({
            filename: './dist/prod/react-loadable.json',
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
};
