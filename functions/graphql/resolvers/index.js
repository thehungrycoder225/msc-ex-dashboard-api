const { mergeResolvers } = require('@graphql-tools/merge');
const queryResolvers = require('./Query');

const resolvers = mergeResolvers([queryResolvers]);

module.exports = resolvers;
