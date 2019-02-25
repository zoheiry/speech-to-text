const speech = require('@google-cloud/speech');
const formidable = require('formidable');
const fs = require('fs-extra');

const Recording = require('../models/Recording');
const { uploadToGoogleCloud } = require('../utils/gCloud');
const { convertToWav } = require('../utils/audio');
const { sendEmail } = require('../utils/mailer');

const client = new speech.SpeechClient();

module.exports = {
  upload: (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const { name, path } = files.file;
        const newPath =
          path
            .split('/')
            .slice(0, -1)
            .join('/') + '/' + name;
        await fs.move(path, newPath, { overwrite: true });
        let encoding;
        let outPath;
        if (name.indexOf('.flac') > -1) {
          encoding = 'FLAC';
          outPath = newPath;
        } else {
          encoding = 'LINEAR16';
          outPath = await convertToWav(newPath, name);
        }
        const uri = await uploadToGoogleCloud(outPath);
        if (!uri) {
          res.status(500).send('Failed to save file to google cloud, please try again later');
          return;
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
        } catch (err) {
          console.log(err);
        }
        let response = {};
        try {
          [response] = await operation.promise();
        } catch (err) {
          console.log(err);
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
        }).save((error, recording) => {
          if (error) {
            res.status(400).send(error);
          } else if (!recording) {
            res.sendStatus(400);
          } else {
            res.send(recording);
            sendEmail({
              to: 'ali.elzoheiry@gmail.com',
              text: transcribedText,
            });
          }
        });
      }
    });
  },
};

// sox input.mp3 --rate 16k --bits 16 --channels 1 output.flac
