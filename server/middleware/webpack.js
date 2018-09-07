import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import hmr from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';
import webpackConfig from '../../webpack.dev';

const router = express.Router();
const compiler = webpack(webpackConfig);

router.use(history());

router.use(
    webpackMiddleware(compiler, {
        noInfo: true,
        quiet: true,
        stats: 'minimal',
        publicPath: webpackConfig.output.publicPath,
    })
);

router.use(hmr(compiler));

compiler.plugin('done', () => {
    console.log('Clearing client module cache from server');
    Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]client[\/\\]/.test(id)) {
            delete require.cache[id];
        }
    });
});

export default router;
