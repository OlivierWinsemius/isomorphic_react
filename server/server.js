import React from 'react';
import chokidar from 'chokidar';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import Loadable from 'react-loadable';
import ReactSSR from './middleware/reactSSR';
import { clearCache } from './utils/hmr';

if (!global.fetch) {
    global.fetch = fetch;
}
if (!global.React) {
    global.React = React;
}

dotenv.config();

const PORT = process.env.DEV_PORT;
const isDevelopment = process.env.NODE_ENV === 'development';
const isServerOnly = process.env.NODE_ENV === 'server';
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use((req, res, next) => require('./routes').default(req, res, next));

app.use((req, res, next) =>
    require('./middleware/apolloServer').default(req, res, next));

app.use(compression());

if (isDevelopment) {
    app.use(require('./middleware/webpack').default);
} else if (!isServerOnly) {
    app.use(ReactSSR);
}
if (!isProduction) {
    const watcher = chokidar.watch('.', {
        ignored: /(client|node_modules).*/,
    });
    clearCache(watcher, /(server).*/);
}

Loadable.preloadAll()
    .then(() =>
        app.listen(PORT, () =>
            console.log(`listening on http://localhost:${PORT}`)))
    .catch(e => console.warn(e));
