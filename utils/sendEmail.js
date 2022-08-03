const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')

const sendEmail = async ({ to, subject, html }) => {
  // let testAccount = await nodemailer.createTestAccount()

  // const transporter = nodemailer.createTransport(nodemailerConfig)

  // return transporter.sendMail({
  //   from: '"Coding Addict" <codingaddict@gmail.com>', // sender address
  //   to,
  //   subject,
  //   html,
  // })

  sgMail.setApiKey(process.env.SENDGRID_KEY)
  const message = {
    from: 'dennismuiruridev@gmail.com',
    to,
    subject,
    html,
  }

  sgMail
    .send(message)
    .then((res) => console.log('Email sent'))
    .catch((error) => console.log(error.message))
}

module.exports = sendEmail
