const express = require('express')
const router = express.Router()
const MarketController = require('../controllers/MarketController')

router.get('/', MarketController.showMarkets)
router.get('/create', MarketController.createMarket)
router.post('/create', MarketController.createMarketSave)
router.get('/edit/:id', MarketController.updateMarket)
router.post('/edit', MarketController.updateMarketPost)
router.post('/remove', MarketController.removeMarket)

module.exports = router