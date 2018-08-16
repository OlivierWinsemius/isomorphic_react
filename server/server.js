import express from 'express';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import hmr from 'webpack-hot-middleware';
import path from 'path';
import history from 'connect-history-api-fallback';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import webpackConfig from '../webpack.dev';

dotenv.config();
const typeDefs = require('./schemas').default;
const resolvers = require('./resolvers').default;

const PORT = process.env.DEV_PORT;
const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        settings: {
            'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
        },
    },
});
server.applyMiddleware({ app });

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

app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`listening on http://localhost:${PORT + server.graphqlPath}`));
