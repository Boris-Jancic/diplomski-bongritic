import nodemailer from 'nodemailer'
import { AUTH_MAILER_EMAIL, AUTH_MAILER_PASS } from '../server.js';

export default async function mailToClient(reciever, title, message) {
  console.log(AUTH_MAILER_EMAIL)
  console.log(AUTH_MAILER_PASS)
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: AUTH_MAILER_EMAIL,
      pass: AUTH_MAILER_PASS,
    },
    secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: `"Bongritic" <${AUTH_MAILER_EMAIL}>`,
    to: reciever,
    subject: title,
    html: `<h1><b>${message}</b></h1>`,
    }, function (error, info) {
      if (error) {
          return console.log("ERROR----" + error);
      }
      console.log('Message sent: ' + info.response);
  });
}