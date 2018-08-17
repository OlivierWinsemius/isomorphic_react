import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { StaticRouter } from 'react-router-dom';
import store from '../../client/redux/store';
import SSR from './SSR';

const router = express.Router();

router.get('*', (req, res) => {
    const sheets = new SheetsRegistry();

    const content = renderToString(
        <StaticRouter location={req.url}>
            <JssProvider registry={sheets}>
                <SSR store={store} />
            </JssProvider>
        </StaticRouter>
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
