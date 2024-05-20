const mongoose = require('mongoose');
const db = mongoose.connect;
const localUri = 'mongodb://localhost:27017/graphql';

module.exports.dbConnect = async () => {
  try {
    await db(process.env.CLOUD_DB_URI || localUri).then(() => {
      process.env.CLOUD_DB_URI
        ? console.log('Cloud database connected')
        : console.log('Local database connected');
    });
  } catch (err) {
    console.log(err);
  } finally {
    return db;
  }
};
