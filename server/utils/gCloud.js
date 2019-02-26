const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage();
const BUCKET_NAME = 'cf-speech-to-text-audio';
const bucket = storage.bucket(BUCKET_NAME);

const uploadToGoogleCloud = async (filePath) => {
  const fileName = path.basename(filePath);
  try {
    await bucket.upload(filePath);
    console.log('File successfully uploaded to google cloud');
    return `gs://${BUCKET_NAME}/${fileName}`;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { uploadToGoogleCloud };
