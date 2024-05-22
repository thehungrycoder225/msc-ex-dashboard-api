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

  getCopcProfile(
    filters: CopcFilters
    groupBy: [GroupBy]
  ): [Copc]

  getFacultyEmploymentStatusProfile(
    filters: FacultyProfileFilters
    groupBy: [GroupBy]
  ): [FacultyEmploymentStatus]

  getFacultyEmploymentTypeProfile(
    filters: FacultyProfileFilters
    groupBy: [GroupBy]
  ): [FacultyEmploymentType]

  getFacultyEducationalAttainmentProfile(
    filters: FacultyProfileFilters
    groupBy: [GroupBy]
  ): [FacultyEducationalAttainment]

  getFacultyAcademicRankProfile(
    filters: FacultyProfileFilters
    groupBy: [GroupBy]
  ): [FacultyAcademicRank]

}


enum GroupBy {
  year
  branch
  semester
  category
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

  type Copc {
    id: ID!
    year: Int!
    category: String!
    count: Int!
  }

  input CopcFilters {
    year: Int
    category: String
  }

  type FacultyEmploymentStatus {
    id: ID!
    year: Int!
    employmentStatus: String!
    count: Int!
  }

  type FacultyEmploymentType {
    id: ID!
    year: Int!
    employmentType: String!
    count: Int!
  }

  type FacultyEducationalAttainment {
    id: ID!
    year: Int!
    educationalAttainment: String!
    count: Int!
  }

  type FacultyAcademicRank {
    id: ID!
    year: Int!
    academicRank: String!
    count: Int!
  }

  input FacultyProfileFilters {
    year: Int
    employmentStatus: String
    employmentType: String
    educationalAttainment: String
    academicRank: String
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

    addCopcProfile (
      year: Int!
      category: String!
      count: Int!
    ): Copc
    
    addFacultyEmploymentStatusProfile(
      year: Int!
      employmentStatus: String!
      count: Int!
    ): FacultyEmploymentStatus

    addFacultyEmploymentTypeProfile(
      year: Int!
      employmentType: String!
      count: Int!
    ): FacultyEmploymentType

    addFacultyEducationalAttainmentProfile(
      year: Int!
      educationalAttainment: String!
      count: Int!
    ): FacultyEducationalAttainment

    addFacultyAcademicRankProfile(
      year: Int!
      academicRank: String!
      count: Int!
    ): FacultyAcademicRank
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

type Copc {
  id: ID!
  year: Int!
  category: String!
  count: Int!

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
