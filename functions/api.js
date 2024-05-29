const { createHandler } = require('graphql-http/lib/use/express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const logger = require('./utils/logger');
const { dbConnect } = require('./config/db');
const serverless = require('serverless-http');
const { ApolloServer } = require('apollo-server');

dotenv.config();
dbConnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// server.use('/.netlify/functions/api/graphql');

server.listen().then(({ url }) => {
  console.log({
    message: `Server ready at ${url}`,
    api: `API ready at ${url}/graphql`,
  });
});

module.exports.handler = serverless(app);
