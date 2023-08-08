const jwt = require('jsonwebtoken')
// middleware to validate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Acesso negado!' })

  try {
    const verified = jwt.verify(token, 'usersecret')
   
    req.user = verified
  
    next()
  } catch (err) {
    res.status(400).json({ message: 'O Token é inválido!' })
  }
}

module.exports = { verifyToken }
