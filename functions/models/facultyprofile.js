const mongoose = require('mongoose');
const { facultyEmploymentStatusSchema,
    facultyEmploymentTypeSchema,
    facultyEducationalAttainmentSchema,
    facultyAcademicRankSchema } = require('../schema/facultyprofile');

const FacultyEmploymentStatus = mongoose.model('FacultyEmploymentStatus', facultyEmploymentStatusSchema);
const FacultyEmploymentType = mongoose.model('FacultyEmploymentType', facultyEmploymentTypeSchema);
const FacultyEducationalAttainment = mongoose.model('FacultyEducationalAttainment', facultyEducationalAttainmentSchema);
const FacultyAcademicRank = mongoose.model('FacultyAcademicRank', facultyAcademicRankSchema);

module.exports = {
    FacultyEmploymentStatus,
    FacultyEmploymentType,
    FacultyEducationalAttainment,
    FacultyAcademicRank
}