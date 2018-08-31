module.exports = {
    output: {
        filename: '[name].js',
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
};
