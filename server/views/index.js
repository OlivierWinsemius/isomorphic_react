import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const router = express.Router();

router.get('*', (req, res) => {
    const sheets = new SheetsRegistry();

    renderToString(
        <StaticRouter location={req.url}>
            <JssProvider registry={sheets}>
                <App store={{}} />
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
                    <div id="root">
                        <StaticRouter location={req.url}>
                            <App store={{}} />
                        </StaticRouter>
                    </div>
                </body>
                <script src="/build/app.js" />
            </html>
        )
    );
});

export default router;
