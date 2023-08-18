require("dotenv").config();

const nodemailer = require("nodemailer");

const { FRONTEND_URL } = process.env;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendForgottenPassword = (req, res) => {
  transporter.sendMail(
    {
      from: "vivianq23.dev@gmail.com",
      to: req.user.email,
      subject: "Forgotten password ?",
      text: "Click here to create a new password !",
      html: `<p>To create a new password, <a href="${FRONTEND_URL}/reset-password/${req.user.passwordToken}">click here !</a></p>`,
    },
    (err, info) => {
      console.warn(info);
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.sendStatus(200);
    }
  );
};

module.exports = { sendForgottenPassword };
