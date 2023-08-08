const jwt = require('jsonwebtoken')

const User = require('../models/User')

async function getUserByToken(token) {
  try{
    const decodedToken = jwt.verify(token, 'usersecret')

    const userId = decodedToken.id

    const user = await User.findOne({ where: { id: userId } })

    return user
  } catch(error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
}

module.exports = { getUserByToken }