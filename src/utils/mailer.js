const {transporter} = require("../../index");

const messageBuilder = function(from, to, subject, text, html) {

  return {
    from: {
      name: from,
      address: process.env.EMAIL_USER
    },
    to: to,
    subject: subject,
    text: text,
    html: html
  };
}
const sendMail = function(email, message){
  transporter.sendMail(message, (err) => {
    if (err) {
      console.log(err)
      return false;
    }
    return true;
  })
}

module.exports = {messageBuilder,sendMail}