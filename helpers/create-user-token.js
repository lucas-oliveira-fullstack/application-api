const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {

    //create a token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, 'usersecret')

    //return token
    return res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        id: user.id,
    })
}

module.exports = { createUserToken }