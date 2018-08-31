import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { StaticRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import store from '../../client/redux/store';

const router = express.Router();

router.get('*', (req, res) => {
    const sheets = new SheetsRegistry();

    const client = new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache(),
        link: createHttpLink({
            uri: 'http://localhost:3010',
            credentials: 'same-origin',
            headers: {
                cookie: req.header('Cookie'),
            },
        }),
    });

    const content = renderToString(
        <ApolloProvider client={client}>
            <StaticRouter location={req.url}>
                <JssProvider registry={sheets}>
                    <App store={store} />
                </JssProvider>
            </StaticRouter>
        </ApolloProvider>
    );

    return res.send(
        renderToString(
            <html lang="en">
                <head>
                    <style type="text/css">{sheets.toString()}</style>
                </head>
                <body>
                    <div
                        id="root"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </body>
                <script src="/build/app.js" />
            </html>
        )
    );
});

export default router;
