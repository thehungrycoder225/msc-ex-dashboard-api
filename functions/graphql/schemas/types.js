const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    groupedEnrollment(
      year: Int
      branch: String
      groupBy: [GroupByInput!]
    ): [GroupedEnrollment!]

    getEnrollmentRate(
      year: Int
      branch: String
      semester: String
    ): [EnrollmentRate!]
  }

  input GroupByInput {
    field: String!
  }

  type GroupedEnrollment {
    enrollmentRate: Int!
    year: Int
    branch: String
  }

  type EnrollmentRate {
    id: ID!
    year: Int!
    semester: Int!
    branch: String!
    enrollmentRate: Int!
  }

  type Mutation {
    addEnrollmentRate(
      year: Int!
      branch: String!
      semester: Int!
      enrollmentRate: Int!
    ): EnrollmentRate
  }
`;

module.exports = typeDefs;
