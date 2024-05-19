const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

dotenv.config();

const localUri = 'mongodb://localhost:27017/graphql';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CLOUD_DB_URI || localUri);
    if (!mongoose.connection.readyState) {
      console.log('DB connection failed');
    } else {
      if (process.env.CLOUD_DB_URI) {
        console.log('Cloud database connected');
        return;
      }
      console.log('Local database connected');
    }
  } catch (err) {
    console.log(err);
  }
};
dbConnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => {
  console.log({
    message: `Server ready at ${url}`,
    api: `API ready at ${url}/graphql`,
  });
});
