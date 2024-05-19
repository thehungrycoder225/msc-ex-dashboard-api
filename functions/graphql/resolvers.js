const ProgramOffering = require('../models/offerings');
const EnrollmentRate = require('../models/enrollment');
const resolvers = {
  Query: {
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
    enrollmentRates: async (_, { year, branch, semester }) => {
      const query = {};
      if (year) query.year = year;
      if (branch) query.branch = branch;
      if (semester) query.semester = semester;
      return await EnrollmentRate.find(query);
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
  },
};

module.exports = resolvers;
