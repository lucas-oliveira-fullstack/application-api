const router = require('express').Router()

const MarketPainelController = require('../controllers/MarketPanelCotroller')

router.post('/register-user/:id', MarketPainelController.registerUser)

module.exports = router