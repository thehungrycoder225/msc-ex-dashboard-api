const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    offerings: [Offering]
    totalOfferings(year: Int, type: String): Int
    groupedOfferings(year: Int, type: String): [GroupedOffering]
    enrollmentRates(year: Int, branch: String, semester: String): [Enrollment]
  }
  type Offering {
    id: ID!
    year: Int!
    type: String!
    count: Int!
  }
  type Enrollment {
    id: ID!
    year: Int!
    branch: String!
    semester: String!
    rate: Float!
  }
  type GroupedOffering {
    year: Int!
    type: String!
    count: Int!
  }
  type Mutation {
    addOffering(year: Int!, type: String!, count: Int!): Offering
    addEnrollmentRate(
      year: Int!
      branch: String!
      semester: String!
      rate: Float!
    ): Enrollment
  }
`;

module.exports = typeDefs;
