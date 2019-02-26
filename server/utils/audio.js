const sox = require('sox');

const convertToWav = (path, name) =>
  new Promise((resolve, reject) => {
    const outPath =
      path
        .split('/')
        .slice(0, -1)
        .join('/') + '/' + name.split('.')[0] + '.raw';
    console.log(path);
    const job = sox.transcode(path, outPath, {
      format: 'wav',
      channelCount: 1,
      sampleRate: 44100,
      compressionQuality: 5,
      bitRate: 192 * 1024,
    });

    job.start();


    job.on('error', function(err) {
      console.error(err);
      reject(err);
    });

    job.on('end', function() {
      console.log('File successfully converted to Wav');
      resolve(outPath);
    });
  });

module.exports = {
  convertToWav,
};
