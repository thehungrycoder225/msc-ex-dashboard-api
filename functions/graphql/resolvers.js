const ProgramOffering = require('../models/offerings');
const EnrollmentRate = require('../models/enrollment');
const GraduationRates = require('../models/graduates')
const AccreditationProfile = require('../models/accreditation')
const CopcProfile = require('../models/copc')
const {
  FacultyEmploymentStatus,
  FacultyEmploymentType,
  FacultyEducationalAttainment,
  FacultyAcademicRank
} = require('../models/facultyprofile');
const LicensureProfile = require('../models/licensure');
const ScholarshipProfile = require('../models/scholarship');
const {
  rndProjectModel,
  rndPublicationProfileModel,
  rndPresentationProfileModel,
  rndCopyrightProfileModel
} = require('../models/researchprofile');



// Helper function to handle groupBy
const handleGroupBy = (groupBy, countField) => {
  if (groupBy.length === 0) {
    return {};
  }

  const group = groupBy.reduce(
    (acc, field) => ({ ...acc, [field]: `$${field}` }),
    {}
  );

  const project = groupBy.reduce(
    (acc, field) => ({ ...acc, [field]: `$_id.${field}` }),
    { _id: 0, [countField]: 1 }
  );

  const sort = groupBy.reduce(
    (acc, field) => ({ ...acc, [field]: 1 }),
    {}
  );

  return { group, project, sort };
};



const resolvers = {
  Query: {
    // Program Offerings Profile
    getProgramOfferingsProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.year) query.year = filters.year;
      if (filters.type) query.type = filters.type;

      if (groupBy.length === 0) {
        return await ProgramOffering.find(query);
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await ProgramOffering.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ]);
    },

    // Enrollment Profile
    getEnrollmentRates: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.year) query.year = filters.year;
      if (filters.branch) query.branch = filters.branch;
      if (filters.semester) query.semester = filters.semester;

      if (groupBy.length === 0) {
        return await EnrollmentRate.find(query);
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'enrollmentRate');

      return await EnrollmentRate.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            enrollmentRate: { $avg: '$enrollmentRate' },
          },
        },
        { $project: project },
        { $sort: sort },
      ]);
    },

    // Graduates Profile
    getGraduationRates: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.year) query.year = filters.year;
      if (filters.branch) query.branch = filters.branch;

      if (groupBy.length === 0) {
        return await GraduationRates.find(query);
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'graduateCount');

      return await GraduationRates.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            graduateCount: { $sum: '$graduateCount' },
          },
        },
        { $project: project },
        { $sort: sort },
      ]);
    },


    // Accreditation Profile
    getAccreditationProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.category) query.category = filters.category

      if (groupBy.length === 0) {
        return await AccreditationProfile.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'accreditationCount');

      return await AccreditationProfile.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            accreditationCount: { $sum: '$accreditationCount' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    // COPC Profile
    getCopcProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.category) query.category = filters.category

      if (groupBy.length === 0) {
        return await CopcProfile.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await CopcProfile.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    // Faculty Profile

    getFacultyEmploymentStatusProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.employmentStatus) query.employmentStatus = filters.employmentStatus

      if (groupBy.length === 0) {
        return await FacultyEmploymentStatus.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await FacultyEmploymentStatus.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    getFacultyEmploymentTypeProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.employmentType) query.employmentType = filters.employmentType

      if (groupBy.length === 0) {
        return await FacultyEmploymentType.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await FacultyEmploymentType.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    getFacultyEducationalAttainmentProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.educationalAttainment) query.educationalAttainment = filters.educationalAttainment

      if (groupBy.length === 0) {
        return await FacultyEducationalAttainment.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await FacultyEducationalAttainment.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    getFacultyAcademicRankProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.academicRank) query.academicRank = filters.academicRank

      if (groupBy.length === 0) {
        return await FacultyAcademicRank.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await FacultyAcademicRank.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    // Licensure Profile
    getLicensureProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.month) query.month = filters.month
      if (filters.type) query.type = filters.type

      if (groupBy.length === 0) {
        return await LicensureProfile.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'passingRate');

      return await LicensureProfile.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            passingRate: { $avg: '$passingRate' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    // Scholarship Profile
    getScholarshipProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.scholarshipName) query.scholarshipName = filters.scholarshipName

      if (groupBy.length === 0) {
        return await ScholarshipProfile.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'scholarshipCount');

      return await ScholarshipProfile.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            scholarshipCount: { $sum: '$scholarshipCount' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    // Research Profile
    getResearchProjectProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.category) query.category = filters.category

      if (groupBy.length === 0) {
        return await rndProjectModel.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await rndProjectModel.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    getPublicationProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.category) query.category = filters.category

      if (groupBy.length === 0) {
        return await rndPublicationProfileModel.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await rndPublicationProfileModel.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    getPresentationProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.category) query.category = filters.category

      if (groupBy.length === 0) {
        return await rndPresentationProfileModel.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await rndPresentationProfileModel.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

    getCopyrightsProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.year) query.year = filters.year
      if (filters.category) query.category = filters.category

      if (groupBy.length === 0) {
        return await rndCopyrightProfileModel.find(query)
      }

      const { group, project, sort } = handleGroupBy(groupBy, 'count');

      return await rndCopyrightProfileModel.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: project },
        { $sort: sort },
      ])
    },

  },


  Mutation: {
    addOffering: async (_, args) => {
      const newOffering = new ProgramOffering({ ...args });
      return await newOffering.save();
    },
    addEnrollmentRate: async (_, args) => {
      const newEnrollmentRate = new EnrollmentRate({ ...args });
      return await newEnrollmentRate.save();
    },
    addGraduationRate: async (_, args) => {
      const newGraduationRate = new GraduationRates({ ...args });
      return await newGraduationRate.save();
    },
    addAccreditationProfile: async (_, args) => {
      const newAccreditationProfile = new AccreditationProfile({ ...args });
      return await newAccreditationProfile.save();
    },
    addCopcProfile: async (_, args) => {
      const newCopcProfile = new CopcProfile({ ...args });
      return await newCopcProfile.save();
    },

    addFacultyEmploymentStatusProfile: async (_, args) => {
      const newFacultyEmploymentStatus = new FacultyEmploymentStatus({ ...args });
      return await newFacultyEmploymentStatus.save();
    },

    addFacultyEmploymentTypeProfile: async (_, args) => {
      const newFacultyEmploymentType = new FacultyEmploymentType({ ...args });
      return await newFacultyEmploymentType.save();
    },

    addFacultyEducationalAttainmentProfile: async (_, args) => {
      const newFacultyEducationalAttainment = new FacultyEducationalAttainment({ ...args });
      return await newFacultyEducationalAttainment.save();
    },

    addFacultyAcademicRankProfile: async (_, args) => {
      const newFacultyAcademicRank = new FacultyAcademicRank({ ...args });
      return await newFacultyAcademicRank.save();
    },
    addLicensureProfile: async (_, args) => {
      const newLicensureProfile = new LicensureProfile({ ...args });
      return await newLicensureProfile.save();
    },
    addScholarshipProfile: async (_, args) => {
      const newScholarshipProfile = new ScholarshipProfile({ ...args });
      return await newScholarshipProfile.save();
    },
    addResearchProjectProfile: async (_, args) => {
      const newRndProjectProfile = new rndProjectModel({ ...args });
      return await newRndProjectProfile.save();
    },
    addPublicationProfile: async (_, args) => {
      const newRndPublicationProfile = new rndPublicationProfileModel({ ...args });
      return await newRndPublicationProfile.save();
    },
    addPresentationProfile: async (_, args) => {
      const newRndPresentationProfile = new rndPresentationProfileModel({ ...args });
      return await newRndPresentationProfile.save();
    },
    addCopyrightsProfile: async (_, args) => {
      const newRndCopyrightProfile = new rndCopyrightProfileModel({
        ...args,
      });
      return await newRndCopyrightProfile.save();
    },
  },
};

module.exports = resolvers;
