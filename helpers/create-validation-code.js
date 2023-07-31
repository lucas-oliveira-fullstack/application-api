const User = require('../models/User')

async function generateRandomNumbers() {
  const randomNumbers = []
  
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * 100) // Generate a random number between 0 and 99
    randomNumbers.push(randomNumber)
  }

  // Save the validation code to the database
  const user = await User.create({ validationCode: randomNumbers });

  return randomNumbers
}
  
module.exports = { generateRandomNumbers }
