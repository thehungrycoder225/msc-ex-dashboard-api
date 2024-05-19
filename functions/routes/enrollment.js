const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment');

router.get('/', async (req, res) => {
  const enrollments = await Enrollment.find();
  res.send(enrollments);
});
