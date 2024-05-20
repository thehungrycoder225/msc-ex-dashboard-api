const EnrollmentRate = require('../../models/enrollment');

const resolvers = {
  Query: {
    groupedEnrollment: async (_, { year, branch, groupBy }) => {
      const matchStage = {};
      if (year) matchStage.year = year;
      if (branch) matchStage.branch = branch;

      const groupStage = {
        _id: {},
        count: { $sum: '$enrollmentRate' },
      };

      if (groupBy) {
        groupBy.forEach((group) => {
          groupStage._id[group.field] = `$${group.field}`;
        });
      } else {
        groupStage._id = null;
      }

      const projectionStage = {
        _id: 0,
        count: { $sum: '$enrollmentRate' },
      };

      if (groupBy) {
        groupBy.forEach((group) => {
          projectionStage[group.field] = `$_id.${group.field}`;
        });
      }

      const aggregationPipeline = [
        { $match: matchStage },
        { $group: groupStage },
        { $project: projectionStage },
      ];
      return EnrollmentRate.aggregate(aggregationPipeline);
    },

    getEnrollmentRate: async (_, { year, branch, semester }) => {
      const query = {};
      if (year) query.year = year;
      if (branch) query.branch = branch;
      if (semester) query.semester = semester;
      return await EnrollmentRate.find(query);
    },
  },

  Mutation: {
    addEnrollmentRate: async (
      _,
      { year, branch, semester, enrollmentRate }
    ) => {
      const newEnrollmentRate = new EnrollmentRate({
        year,
        branch,
        semester,
        enrollmentRate,
      });
      return await newEnrollmentRate.save();
    },
  },
};

module.exports = resolvers;
