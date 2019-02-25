import ffmpeg from 'ffmpeg';

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const blobToFile = (blob, fileName = 'Recording') =>
  new File([blob], fileName);


// export const convertToMp3 = (blob) =>
//   new Promise((resolve, reject) => {
//     ffmpeg(URL.createObjectURL(blob).replace('blob:', '')).then(audio => {
//       audio.fnExtractSoundToMp3('./sound.mp3', (err, file) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(file);
//         }
//       })
//     })
//   })