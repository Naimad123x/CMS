const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

(async () => {
  transporter.verify(function (error) {
    if (error)
      throw new Error(`SMTP server error: `+ error);
    console.log("SMTP server started successfully");
  });
})();

module.exports = transporter;