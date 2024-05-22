const ProgramOffering = require('../models/offerings');
const EnrollmentRate = require('../models/enrollment');
const GraduationRates = require('../models/graduates')
const AccreditationProfile = require('../models/accreditation')


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
    getEnrollmentRates: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.year) query.year = filters.year;
      if (filters.branch) query.branch = filters.branch;
      if (filters.semester) query.semester = filters.semester;

      const { group, project, sort } = handleGroupBy(groupBy, 'enrollmentRate');

      return await EnrollmentRate.aggregate([
        { $match: query },
        { $group: { _id: group, enrollmentRate: { $sum: '$enrollmentRate' } } },
        { $project: project },
        { $sort: sort },
      ]).lean();
    },
    getGraduationRates: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.year) query.year = filters.year;
      if (filters.branch) query.branch = filters.branch;

      const { group, project, sort } = handleGroupBy(groupBy, 'graduateCount');

      return await GraduationRates.aggregate([
        { $match: query },
        { $group: { _id: group, graduateCount: { $sum: '$graduateCount' } } },
        { $project: project },
        { $sort: sort },
      ]).lean();
    },
    getAccreditationProfile: async (_, { filters = {}, groupBy = [] }) => {
      const query = {};
      if (filters.category) query.category = filters.category;
      if (filters.program) query.program = filters.program;
      if (filters.year) query.year = filters.year;

      const { group, project, sort } = handleGroupBy(groupBy, 'accreditationCount');

      return await AccreditationProfile.aggregate([
        { $match: query },
        { $group: { _id: group, accreditationCount: { $sum: '$accreditationCount' } } },
        { $project: project },
        { $sort: sort },
      ]).lean();
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
  },
};

module.exports = resolvers;
