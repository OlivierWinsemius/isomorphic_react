import dotenv from 'dotenv';
import express from 'express';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import hmr from 'webpack-hot-middleware';
import path from 'path';
import history from 'connect-history-api-fallback';
import webpackConfig from '../webpack.dev';

dotenv.config();

const app = express();
const PORT = process.env.DEV_PORT;
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    const compiler = webpack(webpackConfig);
    app.use(history());
    app.use(
        middleware(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
        })
    );

    app.use(hmr(compiler));
} else {
    // eslint-disable-next-line global-require
    const views = require('./views').default;
    app.use('/build', express.static(path.join(__dirname, '../dist/prod')));
    app.use('/', views);
}

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
