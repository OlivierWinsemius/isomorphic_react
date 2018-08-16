import express from 'express';
import dotenv from 'dotenv';
import webpackMiddleware from './middleware/webpack';
import chokidar from 'chokidar';

dotenv.config();

const PORT = process.env.DEV_PORT;
const isDevelopment = process.env.NODE_ENV === 'development';
const isServerOnly = process.env.NODE_ENV === 'server';
const app = express();

app.use((req, res, next) =>
    require('./middleware/apolloServer').default(req, res, next)
);

if (isDevelopment) {
    app.use(webpackMiddleware);

    const watcher = chokidar.watch('.');
    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log('Clearing module cache from server');
            Object.keys(require.cache).forEach(id => {
                if (/[\/\\]server[\/\\]/.test(id)) {
                    delete require.cache[id];
                }
            });
        });
    });
} else if (!isServerOnly) {
    app.use((req, res, next) =>
        require('./middleware/reactSSR').default(req, res, next)
    );
}

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
