const { typeDefs } = require('./graphql/typeDefs');
const { dbConnect } = require('./config/db');
const resolvers = require('./graphql/resolvers');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
const logger = require('./utils/logger');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');

dotenv.config();
dbConnect();

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const handleServerStart = async () => {
  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};
handleServerStart();
app.use(cors());
// server.use('/.netlify/functions/api/graphql');
module.exports.handler = serverless(app);
