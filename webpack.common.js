const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

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
                test: /\.graphql$/,
                exclude: /node_modules/,
                use: {
                    loader: 'graphql-tag/loader',
                },
            },
        ],
    },

    plugins: [
        new ReactLoadablePlugin({
            filename: './react-loadable.json',
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
