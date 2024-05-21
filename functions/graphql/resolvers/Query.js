const EnrollmentRate = require('../models/enrollment');

const resolvers = {
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

      const sort = groupBy.reduce((acc, field) => ({ ...acc, [field]: 1 }), {});

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
};

module.exports = resolvers;
