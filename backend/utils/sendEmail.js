const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    // service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

module.exports = sendMail
