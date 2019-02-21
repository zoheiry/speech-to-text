const exec = require('child_process').exec;

const convertToFlac = (path, name) =>
  new Promise((resolve, reject) => {
    const outPath =
      path
        .split('/')
        .slice(0, -1)
        .join('/') + '/' + name.split('.')[0] + '.flac';
    exec(`sox -t mp3 --rate 44100 --bits 16 --channels 1 ${path} ${outPath}`, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`sox transformed file successfully ${path} to ${outPath}`);
        resolve(outPath);
      }
    });
  });

module.exports = {
  convertToFlac,
};
