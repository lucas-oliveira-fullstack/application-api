const nodemailer = require('nodemailer')

const createValidationCode = require('./create-validation-code')

async function sendVerificationCodeEmail(email, name) {

  try {

    //Generate the validation code and save it to the database
    const validationCode = createValidationCode.generateRandomNumbers()

    //Transporter settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'lucasoliveira.lo.1991@outlook.com',
        pass: 'MariaLuiza@2015',
    },
  })

    //Email options
    const mailOptions = {
      from: 'lucasoliveira.lo.1991@outlook.com',
      to: email,
      subject: 'Código de verificação',
      text: `Olá ${name}, seu código de verificação é: ${validationCode}`,
  }

    //Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Erro ao enviar o e-mail:', error)
      } else {
        console.log('E-mail enviado:', info.response)
      }
    })
  } catch (error) {

    res.status(400).json({ message: 'Erro ao enviar e-mail' })
  }
}

module.exports = { sendVerificationCodeEmail }
