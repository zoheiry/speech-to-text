const sox = require('sox');

// const convertToFlac = (path, name) =>
//   new Promise((resolve, reject) => {
//     const outPath =
//       path
//         .split('/')
//         .slice(0, -1)
//         .join('/') + '/' + name.split('.')[0] + '.flac';
//     exec(`sox -t mp3 --rate 44100 --bits 16 --channels 1 ${path} ${outPath}`, (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         console.log(`sox transformed file successfully ${path} to ${outPath}`);
//         resolve(outPath);
//       }
//     });
//   });

const convertToWav = (path, name) =>
  new Promise((resolve, reject) => {
    const outPath =
      path
        .split('/')
        .slice(0, -1)
        .join('/') + '/' + name.split('.')[0] + '.raw';
    sox.identify(path, (err, results) => {
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
  });

module.exports = {
  convertToWav,
};
