const { gql } = require('apollo-server');
const schema = gql`
  type Query {
    offerings: [Offering]
    enrollmentRates(year: Int, branch: String, semester: Int): [Enrollment]
  }
`;

module.exports = schema;
