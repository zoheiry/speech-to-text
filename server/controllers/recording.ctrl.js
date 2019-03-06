const speech = require('@google-cloud/speech');
const formidable = require('formidable');

const Recording = require('../models/Recording');
const User = require('../models/User');
const { uploadToGoogleCloud } = require('../utils/gCloud');
const { convertToWav } = require('../utils/audio');
const { sendEmail } = require('../utils/mailer');
const { renameFile } = require('../utils/file');

const client = new speech.SpeechClient();

module.exports = {
  upload: (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).send(err);
      }
      const { name, path } = files.file;
      // Rename is required because the file extension is lost otherwise.
      const newPath = renameFile(path, name);
      let encoding;
      let outPath;
      if (name.indexOf('.flac') > -1) {
        // No need to convert FLAC to WAV since it's already supported by google speech-to-text.
        encoding = 'FLAC';
        outPath = newPath;
      } else {
        encoding = 'LINEAR16';
        try {
          // convert all other files to wav (even .wav files to ensure the file only has 1 channel).
          outPath = await convertToWav(newPath, name);
        } catch (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      }
      let uri;
      try {
        uri = await uploadToGoogleCloud(outPath);
      } catch (err) {
        return res.status(500).send(err);
      }
      const audio = { uri };
      const config = {
        encoding,
        sampleRateHertz: 44100,
        languageCode: 'en-US',
      };
      const request = {
        audio: audio,
        config: config,
      };
      let operation;
      try {
        [operation] = await client.longRunningRecognize(request);
        res.sendStatus(200);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      console.log('Got operation. Transcribing text...');
      let response;
      try {
        [response] = await operation.promise();
      } catch (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      const transcribedText = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Transcription: ${transcribedText}`);
      new Recording({
        user: req.body.currentUserId,
        fileUri: uri,
        transcribedText,
        name,
      }).save(async (error, recording) => {
        if (error) {
          console.log(error);
        } else if (!recording) {
          console.log('Failed to save recording.');
        } else {
          try {
            const user = await User.findById(req.body.currentUserId);
            console.log(`Sending email to ${user.email}`);
            sendEmail({
              to: user.email,
              text: transcribedText,
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    });
  },

  getUserRecordings: async (req, res) => {
    try {
      const userRecordings = await Recording.find({ user: req.body.currentUserId }).sort({
        createdAt: 'desc',
      });
      if (!userRecordings) {
        return res.sendStatus(404);
      }
      res.send(userRecordings);
    } catch (err) {
      res.send(err);
    }
  },
};
