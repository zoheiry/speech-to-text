const speech = require('@google-cloud/speech');
const formidable = require('formidable');
const exec = require('child_process').exec;

const Recording = require('../models/Recording');
const { uploadToGoogleCloud } = require('../utils/gCloud');
const { convertToFlac } = require('../utils/audio');

const client = new speech.SpeechClient();

module.exports = {
  upload: (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const { path, name } = files.file;
        const outPath = await convertToFlac(path, name);
        const uri = await uploadToGoogleCloud(outPath);
        if (!uri) {
          res.status(500).send('Failed to save file to google cloud, please try again later');
          return;
        }
        const audio = { uri };
        const config = {
          encoding: 'FLAC',
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
        let response;
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
          }
        });
      }
    });
  },
};

// sox input.mp3 --rate 16k --bits 16 --channels 1 output.flac
