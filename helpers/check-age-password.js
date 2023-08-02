// check-age-and-password.js

async function checkAgeAndRequestPassword(userAge) {
    if (userAge >= 18) {
      return { requestPassword18: true, message: 'Por favor, crie uma senha para a sua conta.' }
    }
  }
  
  module.exports = { checkAgeAndRequestPassword }
  