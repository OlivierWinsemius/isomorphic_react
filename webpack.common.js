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
        ],
    },
};
