const nodemailer = require('nodemailer')

const send = (from, to, subject, text) => {
  // send via smtp
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  const mailOptions = {from, to, subject, text}

  return process.env.NODE_ENV === 'test'
    ? new Promise((resolve) => resolve())
    : transport.sendMail(mailOptions)
}

module.exports = { send }
