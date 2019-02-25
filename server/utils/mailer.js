const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER_EMAIL,
    pass: process.env.MAILER_USER_PASSWORD,
  }
});

const defaultOptions = {
  from: process.env.MAILER_USER_EMAIL,
  subject: 'Your transcribed text',
};

const sendEmail = (options) =>
  new Promise((resolve, reject) => {
    transporter.sendMail({ ...defaultOptions, ...options }, (error, info) => {
      if (error) {
        console.log(error);
        reject();
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve(info);
      }
    })
  });

module.exports = {
  sendEmail,
};
