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
  const messageTemplate = `<div style="margin: auto; width: 75dvw; background-color: #f7f5f5; padding: 2rem; border-radius: 1rem; display: flex; flex-direction: column; gap: 0.25rem; justify-content: center"><h3 style="font-weight: 400">Hello ${req.user.username},</h3>
  <p style="font-weight: 700">A request has been received to change the password for your Instagif Account.</p><a href="${FRONTEND_URL}/reset-password/${req.user.passwordToken}" style="align-self: center; margin-top: 0.5rem; cursor: pointer"><button style="background-color: #991B1B; border-radius: 0.25rem; padding: 0.5rem 3rem; border-style:none; color: #f7f5f5; font-weight: 600; font-size: 1rem; cursor: pointer; height: 3rem">
Reset password</button></a><p>If you did not initiate this request, please contact us immediately at vivianq23.dev@gmail.com</p><p>Thank you,<br>The Instagif Team</p><img src="https://firebasestorage.googleapis.com/v0/b/instagif-8d24a.appspot.com/o/logo.png?alt=media&token=06ed1dec-c654-4021-a90b-86b1ccbddcb6" alt="logo" style="align-self: center; height: 3rem"/>
  </div>`;

  transporter.sendMail(
    {
      from: "vivianq23.dev@gmail.com",
      to: req.user.email,
      subject: `${req.user.username}, forgot your password ?`,
      text: "Click here to create a new password !",
      html: messageTemplate,
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
