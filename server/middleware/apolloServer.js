import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../schemas';
import resolvers from '../resolvers';

const router = express.Router();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
});

server.applyMiddleware({ app: router });

export default router;
