import dotenv from 'dotenv';
import expressGraphQL from 'express-graphql';
import express from 'express';
import schema from './schema';

dotenv.config();
const app = express();
const PORT = 4000;

app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.get('/*', (_, res) => res.send('hoi'));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
