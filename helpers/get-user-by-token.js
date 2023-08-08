const jwt = require('jsonwebtoken')

const User = require('../models/User')

// get user by jwt token
const getUserByToken = async (token) => {
  if(!token) {
    return res.status(401).json({ error: 'Acesso negado!' })
  } 

  // find user
  const decoded = jwt.verify(token, 'usersecret')

  const user = await User.findByPk(decoded.id)
  
  return user
}

module.exports = { getUserByToken }
