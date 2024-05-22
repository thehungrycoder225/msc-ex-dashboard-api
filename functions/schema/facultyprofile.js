const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultyEmploymentStatusSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

const facultyEmploymentTypeSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

const facultyEducationalAttainmentSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    educationalAttainment: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

const facultyAcademicRankSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    academicRank: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})


module.exports = { facultyEmploymentStatusSchema, facultyEmploymentTypeSchema, facultyEducationalAttainmentSchema, facultyAcademicRankSchema }