const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage();
const BUCKET_NAME = 'cf-speech-to-text-audio';
const bucket = storage.bucket(BUCKET_NAME);

const uploadToGoogleCloud = async (filePath) => {
  const fileName = path.basename(filePath);

  await bucket.upload(filePath);

  return `gs://${BUCKET_NAME}/${fileName}`;
};

module.exports = { uploadToGoogleCloud };
