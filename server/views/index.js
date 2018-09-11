import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getBundles } from 'react-loadable/webpack';
import Loadable from 'react-loadable';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import stats from '../../dist/prod/react-loadable.json';
import App from '../../client/components/environments/App';
import { defaults, resolvers } from '../../client/apollo/resolvers';
import typeDefs from '../../client/apollo/schemas';

const router = express.Router();

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    defaults,
    resolvers,
    typeDefs,
});

router.get('*', (req, res) => {
    const sheets = new SheetsRegistry();

    const httpLink = createHttpLink({
        uri: 'http://localhost:3010',
        credentials: 'same-origin',
        headers: {
            cookie: req.header('Cookie'),
        },
    });

    const client = new ApolloClient({
        cache,
        ssrMode: true,
        link: ApolloLink.from([stateLink, httpLink]),
    });

    const modules = [];

    const content = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <ApolloProvider client={client}>
                <StaticRouter location={req.url}>
                    <JssProvider registry={sheets}>
                        <App />
                    </JssProvider>
                </StaticRouter>
            </ApolloProvider>
        </Loadable.Capture>
    );

    const bundles = getBundles(stats, modules);
    return res.send(`
        <html lang="en">
            <head>
                <style type="text/css">${sheets.toString()}</style>
            </head>
            <body>
                <div id="root">
                    ${content}
                </div>
            </body>
            ${bundles
                .map(bundle => `<script src="${bundle.publicPath}"></script>`)
                .join('\n')}
            <script src="/build/vendor.bundle.js"></script>
            <script src="/build/app.js"></script>
        </html>
    `);
});

export default router;
