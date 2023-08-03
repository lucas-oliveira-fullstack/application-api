const express = require('express')
const router = express.Router()

const MarketController = require('../controllers/MarketController')

// Middleware
const { imageUpload } = require('../helpers/image-upload')
const { verifyToken } = require('../helpers/check-token')

router.post('/register', imageUpload.single('logo'), MarketController.register)
router.get('/:id', MarketController.checkMarket)
router.get('/check-market', MarketController.getMarketById)
router.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single('logo'),
    MarketController.editMarket
)
router.delete('/delete', verifyToken, MarketController.deleteMarket)

module.exports = router