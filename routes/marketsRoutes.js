const express = require('express')
const router = express.Router()
const MarketController = require('../controllers/MarketsCotroller')

router.get('/', MarketController.showMarkets)
router.get('/create', MarketController.createMarket)
router.post('/create', MarketController.createMarketSave)
router.get('/edit/:id', MarketController.uputadeMarket)
router.post('/edit', MarketController.updatMarketPost)
router.post('/remove', MarketController.removeMarket)

module.exports = router