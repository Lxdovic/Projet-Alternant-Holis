const mailer = require('nodemailer');

module.exports = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_MAIL,
      pass: process.env.MAILER_PASS
    }
});