const { graphql, buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  offerings: [Offering]
  totalOfferings(year: Int, type: String): Int
  groupedOfferings(year: Int, type: String): [GroupedOffering]

  getEnrollmentRates(
    filters: EnrollmentFilters
    groupBy: [GroupBy]
  ): [Enrollment]

  getGraduationRates(
    filters: GraduationFilters
    groupBy: [GroupBy]
    ): [Graduation]
  
  getAccreditationProfile(
    filters: AccreditationFilters
    groupBy: [GroupBy]
  ): [Accreditation]

}


enum GroupBy {
  year
  branch
  semester
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
  
type Graduation {
  id: ID!
  year: Int!
  branch: String!
  graduateCount: Int!
}

input GraduationFilters {
  year: Int
  branch: String
}

 type Accreditation {
    id: ID!
    year: Int!
    category: String!
    program: String!
    accreditationCount: Int!
 }

  input AccreditationFilters {
    year: Int
    category: String
    program: String
  }
  
  type Mutation {
    addOffering(year: Int!, type: String!, count: Int!): Offering

    addEnrollmentRate(
      year: Int!
      branch: String!
      semester: String!
      rate: Float!
    ): Enrollment

    addGraduationRate(
      year: Int!
      branch: String!
      graduateCount: Int!
    ): Graduation

    addAccreditationProfile(
      year: Int!
      category: String!
      program: String!
      accreditationCount: Int!
    ): Accreditation
  }
`;





const schema = buildSchema(`
type Query {
  offerings: [Offering]
  totalOfferings(year: Int, type: String): Int
  groupedOfferings(year: Int, type: String): [GroupedOffering]

  getEnrollmentRates(
    filters: EnrollmentFilters
    groupBy: [String]
  ): [Enrollment]

  getGraduationRates(
  filters: GraduationFilters
  groupBy: [String]
  ): [Graduation]
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

type Graduation {
  id: ID!
  year: Int!
  branch: String!
  graduateCount: Int!
}

input GraduationFilters {
  year: Int
  branch: String
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

module.exports = { schema, typeDefs };
