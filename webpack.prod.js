const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const dist = path.resolve(__dirname, 'dist', 'prod');

module.exports = merge(common, {
    mode: 'production',

    entry: {
        app: path.resolve(__dirname, 'server', 'views', 'App.js'),
    },

    output: {
        path: path.resolve(__dirname, dist),
    },
});
