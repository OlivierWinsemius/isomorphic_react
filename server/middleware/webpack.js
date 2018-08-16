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
        publicPath: webpackConfig.output.publicPath,
    })
);

router.use(hmr(compiler));

compiler.plugin('done', function() {
    console.log('Clearing /client/ module cache from server');
    Object.keys(require.cache).forEach(id => {
        if (/[\/\\]client[\/\\]/.test(id)) {
            console.log(id);
            delete require.cache[id];
        }
    });
});

export default router;
