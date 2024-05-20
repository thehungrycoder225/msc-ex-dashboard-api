const { mergeTypeDefs } = require('@graphql-tools/merge');
const typeDefs = require('./types');

const schema = mergeTypeDefs([typeDefs]);

module.exports = schema;
