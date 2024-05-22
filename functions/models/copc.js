const copcSchema = require('../schema/copc');
const mongoose = require('mongoose');
const Copc = mongoose.model('Copc', copcSchema);

module.exports = Copc;