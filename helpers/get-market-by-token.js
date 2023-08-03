const jwt = require('jsonwebtoken')

const Market = require('../models/Market')

const getMarketById = async (token) => {
    if(!token) return res.status(401).json({ error: 'Acesso negado!' })

    // Find market
    const decoded = jwt.verify(token, 'marketsecret')

    const markertID = decoded.id

    const market = await Market.findOne({ _id: markertID })

    return market
}

module.exports = { getMarketById }