const ProgramOffering = require('../models/offerings');
const EnrollmentRate = require('../models/enrollment');
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
  },
};

module.exports = resolvers;
