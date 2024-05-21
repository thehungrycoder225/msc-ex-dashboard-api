const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getEnrollmentRates(
      filters: EnrollmentFilters
      groupBy: [String]
    ): [Enrollment]
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
`;

module.exports = typeDefs;
