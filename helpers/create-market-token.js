const jwt = require('jsonwebtoken')

const createMarketToken = async(market, req, res) => {
    // Create a token
    const token = jwt.sign({
        name: market.registered_name,
        id: market.id
    },  'marketsecret')

    // Return token
    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        marketId: market._id,
    })

    return token
}

module.exports = { createMarketToken }