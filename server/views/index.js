import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getBundles } from 'react-loadable/webpack';
import Loadable from 'react-loadable';
import ApolloClient from 'apollo-boost';
import stats from '../../dist/prod/react-loadable.json';
import theme from '../../client/index.theme';
import App from '../../client/components/environments/App';
import { defaults, resolvers } from '../../client/apollo/resolvers';
import typeDefs from '../../client/apollo/schemas';

const router = express.Router();
router.get('*', (req, res) => {
    const sheets = new SheetsRegistry();

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        clientState: {
            defaults,
            resolvers,
            typeDefs,
        },
    });

    const modules = [];

    const content = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <ApolloProvider client={client}>
                <StaticRouter location={req.url}>
                    <JssProvider registry={sheets}>
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
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
