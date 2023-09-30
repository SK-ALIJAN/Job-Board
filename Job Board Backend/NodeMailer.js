const nodemailer = require("nodemailer");
require("dotenv").config();

const MailSenderFunction = (
  mailReceiver,
  mailSubject,
  mailContent,
  Headline
) => {
  // create transporter here
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.gsmtp_server_password,
    },
  });

  // mail configration, how message should look like
  const mailOptions = {
    from: "Sk Alijan <connect2skalijan@gmail.com>",
    to: mailReceiver,
    subject: mailSubject,
    text: mailContent,
    html: `<div>
    <h1 align="center">${Headline}</h1>
    <p align="center">${mailContent}</p>
    <p align="center"> This is an automated message, please don't reply here</p>
    <p align="right">Send by Job board(Sk Alijan,mern-developer)</p>
    </div>`,
  };

  // mail sending
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return info;
    }
  });
};

module.exports = { MailSenderFunction };
