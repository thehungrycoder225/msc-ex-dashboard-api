const { typeDefs } = require('./graphql/typeDefs');
const { dbConnect } = require('./config/db');
const resolvers = require('./graphql/resolvers');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const logger = require('./utils/logger');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use('/.netlify/functions/api/graphql');

dotenv.config();
dbConnect();

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
// server.use('/.netlify/functions/api/graphql');
module.exports.handler = serverless(app);
