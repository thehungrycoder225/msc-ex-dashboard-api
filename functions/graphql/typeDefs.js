const { graphql, buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

const schema = buildSchema(`
type Query {
  offerings: [Offering]
  totalOfferings(year: Int, type: String): Int
  groupedOfferings(year: Int, type: String): [GroupedOffering]
  getEnrollmentRates(
    filters: EnrollmentFilters
    groupBy: [String]
  ): [Enrollment]
}

type Offering {
  id: ID!
  year: Int!
  type: String!
  count: Int!
}

type GroupedOffering {
  year: Int!
  type: String!
  count: Int!
}

type Enrollment {
  id: ID!
  year: Int!
  branch: String!
  semester: String!
  enrollmentRate: Float!
}

input EnrollmentFilters {
  year: Int
  branch: String
  semester: String
}

enum GroupBy {
  year
  branch
  semester
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


`);

const typeDefs = gql`
  type Query {
    offerings: [Offering]
    totalOfferings(year: Int, type: String): Int
    groupedOfferings(year: Int, type: String): [GroupedOffering]
    getEnrollmentRates(
      filters: EnrollmentFilters
      groupBy: [String]
    ): [Enrollment]
  }

  type Offering {
    id: ID!
    year: Int!
    type: String!
    count: Int!
  }

  type GroupedOffering {
    year: Int!
    type: String!
    count: Int!
  }

  type Enrollment {
    id: ID!
    year: Int!
    branch: String!
    semester: String!
    enrollmentRate: Float!
  }

  input EnrollmentFilters {
    year: Int
    branch: String
    semester: String
  }

  enum GroupBy {
    year
    branch
    semester
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

module.exports = { schema, typeDefs };
