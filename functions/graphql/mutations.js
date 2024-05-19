const ProgramOffering = require('../models/offerings');
const EnrollmentRate = require('../models/enrollment');
const { gql } = require('apollo-server');

const mutations = gql`
  type Mutation {
    addOffering(
      year: Int!
      branch: String!
      semester: Int!
      enrollment_count: Int!
    ): Offering
    addEnrollmentRate(
      year: Int!
      branch: String!
      semester: Int!
      enrollment_rate: Float!
    ): Enrollment
  }
`;
module.exports = mutations;
