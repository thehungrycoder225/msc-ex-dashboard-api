const { graphql, buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  getProgramOfferingsProfile(
    filters: ProgramOfferingFilters
    groupBy: [GroupBy]
  ): [Offering]

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

  getLicensureProfile(
    filters: LicensureProfileFilters
    groupBy: [GroupBy]
  ): [LicensureProfile]

  getScholarshipProfile(
    filters: ScholarshipProfileFilters
    groupBy: [GroupBy]
  ): [ScholarshipProfile]
  
  getResearchProjectProfile(
    filters: ResearchProjectProfileFilters
    groupBy: [GroupBy]
  ): [ResearchProjectProfile]

  getPublicationProfile(
    filters: PublicationProfileFilters
    groupBy: [GroupBy]
  ): [PublicationProfile]

  getPresentationProfile(
    filters: PresentationProfileFilters
    groupBy: [GroupBy]
  ): [PresentationProfile]

  getCopyrightsProfile(
    filters: CopyrightsProfileFilters
    groupBy: [GroupBy]
  ) : [CopyrightsProfile]
}

enum GroupBy {
  year
  branch
  semester
  category
  program
  employmentStatus
  employmentType
  educationalAttainment
  academicRank
  month
  type
  scholarshipName
  projectName
  status
  fundingType
  title
  author
  count
}

  type Offering {
    id: ID!
    year: Int!
    type: String!
    count: Int!
  }

  input ProgramOfferingFilters {
    year: Int
    type: String
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

  type LicensureProfile {
    id: ID!
    year: Int!
    month: String!
    type: String!
    passingRate: Float!
    nationalPassingRate: Float!
  }

  input LicensureProfileFilters {
    year: Int
    month: String
    type: String
  }

  type ScholarshipProfile {
    id: ID!
    year: Int!
    scholarshipName: String!
    scholarshipCount: Int!
  }

  input ScholarshipProfileFilters {
    year: Int
    scholarshipName: String
  }

  type ResearchProjectProfile {
    id: ID!
    year: Int!
    category: String!
    projectName: Int!
    status: String!
    type: String!
    fundingType: String!
  }

  input ResearchProjectProfileFilters {
    year: Int
    category: String
    projectName: String
    status: String
    type: String
    fundingType: String
  }

  type PublicationProfile {
    id: ID!
    year: Int!
    category: String!
    title: String!
    author: String!
    type: String!
  }

  input PublicationProfileFilters {
    year: Int
    category: String
    title: String
    author: String
    type: String
  }

  type PresentationProfile {
    id: ID!
    year: Int!
    category: String!
    title: String!
  }

  input PresentationProfileFilters {
    year: Int
    category: String
    title: String
  }

  type CopyrightsProfile {
    id: ID!
    year: Int!
    type: String!
    title: String!
    author: String!
    registrationNo: String!
  }

  input CopyrightsProfileFilters {
    year: Int
    title: String
    type: String!
    author: String
    registrationNo: String
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

    addLicensureProfile(
      year: Int!
      month: String!
      type: String!
      passingRate: Float!
      nationalPassingRate: Float!
    ): LicensureProfile

    addScholarshipProfile(
      year: Int!
      scholarshipName: String!
      scholarshipCount: Int!
    ): ScholarshipProfile

    addResearchProjectProfile(
      year: Int!
      category: String!
      projectName: Int!
      status: String!
      type: String!
      fundingType: String!
    ): ResearchProjectProfile

    addPublicationProfile(
      year: Int!
      category: String!
      title: String!
      author: String!
      type: String!
    ): PublicationProfile

    addPresentationProfile(
      year: Int!
      category: String!
      title: String!
    ): PresentationProfile

    addCopyrightsProfile(
      year: Int!
      type: String!
      title: String!
      author: String!
      registrationNo: String!
    ): CopyrightsProfile
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
