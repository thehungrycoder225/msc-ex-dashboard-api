const mongoose = require('mongoose');
const { rndProjectSchema,
    rndPublicationProfileSchema,
    rndPresentationProfileSchema,
    rndCopyrightProfileSchema,
} = require('../schema/researchprofile');

const rndProjectModel = mongoose.model('rndProject', rndProjectSchema);
const rndPublicationProfileModel = mongoose.model('rndPublicationProfile', rndPublicationProfileSchema);
const rndPresentationProfileModel = mongoose.model('rndPresentationProfile', rndPresentationProfileSchema);
const rndCopyrightProfileModel = mongoose.model('rndCopyrightProfile', rndCopyrightProfileSchema);

module.exports = {
    rndProjectModel,
    rndPublicationProfileModel,
    rndPresentationProfileModel,
    rndCopyrightProfileModel,
};