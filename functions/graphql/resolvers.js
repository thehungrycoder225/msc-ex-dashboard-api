const ProgramOffering = require('../models/offerings');
const EnrollmentRate = require('../models/enrollment');
const GraduationRates = require('../models/graduates')
const AccreditationProfile = require('../models/accreditation')
const CopcProfile = require('../models/copc')
const { FacultyEmploymentStatus,
  FacultyEmploymentType,
  FacultyEducationalAttainment,
  FacultyAcademicRank } = require('../models/facultyprofile');


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
    offerings: async () => {
      return await ProgramOffering.find();
    },
    totalOfferings: async (_, { year, type }) => {
      const query = {};
      if (year) query.year = year;
      if (type) query.type = type;
      return await ProgramOffering.find(query)
        .select('count')
        .then((offerings) =>
          offerings.reduce((acc, curr) => acc + curr.count, 0)
        );
    },
    groupedOfferings: async (_, { year, type }) => {
      const query = {};
      if (year) query.year = year;
      if (type) query.type = type;
      return await ProgramOffering.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: { year: '$year', type: '$type' },
            count: { $sum: '$count' },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            type: '$_id.type',
            count: 1,
          },
        },
        {
          $sort: { year: 1 },
        },
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
      } else {
        const group = groupBy.reduce(
          (acc, field) => ({ ...acc, [field]: `$${field}` }),
          {}
        );

        const project = groupBy.reduce(
          (acc, field) => ({ ...acc, [field]: `$_id.${field}` }),
          { _id: 0, enrollmentRate: 1 }
        );

        const sort = groupBy.reduce(
          (acc, field) => ({ ...acc, [field]: 1 }),
          {}
        );

        return await EnrollmentRate.aggregate([
          { $match: query },
          {
            $group: {
              _id: group,
              enrollmentRate: { $sum: '$enrollmentRate' },
            },
          },
          { $project: { ...project, enrollmentRate: 1 } },
          { $sort: sort },
        ]);
      }
    },

    // Graduates Profile
    getGraduationRates: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.year) query.year = filters.year;
      if (filters.branch) query.branch = filters.branch;

      if (groupBy.length === 0) {
        return await GraduationRates.find(query);
      }

      const group = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: `$${field}` }),
        {}
      );

      const project = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: `$_id.${field}` }),
        { _id: 0, graduateCount: 1 }
      );

      const sort = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: 1 }),
        {}
      );

      return await GraduationRates.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            graduateCount: { $sum: '$graduateCount' },
          },
        },
        { $project: { ...project, graduateCount: 1 } },
        { $sort: sort },
      ])
    },


    // Accreditation Profile
    getAccreditationProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {}
      if (filters.category) query.category = filters.category
      if (filters.program) query.program = filters.program
      if (filters.year) query.year = filters.year

      if (groupBy.length === 0) {
        return await AccreditationProfile.find(query)
      }


      const group = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: `$${field}` }),
        {}
      );

      const project = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: `$_id.${field}` }),
        { _id: 0, accreditationCount: 1 }
      );

      const sort = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: 1 }),
        {}
      );

      return await AccreditationProfile.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            accreditationCount: { $sum: '$accreditationCount' },
          },
        },
        { $project: { ...project, accreditationCount: 1 } },
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

      const group = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: `$${field}` }),
        {}
      );

      const project = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: `$_id.${field}` }),
        { _id: 0, count: 1 }
      );

      const sort = groupBy.reduce(
        (acc, field) => ({ ...acc, [field]: 1 }),
        {}
      );

      return await CopcProfile.aggregate([
        { $match: query },
        {
          $group: {
            _id: group,
            count: { $sum: '$count' },
          },
        },
        { $project: { ...project, count: 1 } },
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
    }


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
    }
  },
};

module.exports = resolvers;
