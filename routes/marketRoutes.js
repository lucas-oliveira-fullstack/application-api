const express = require('express')
const router = express.Router()

const MarketController = require('../controllers/MarketController')

// Middleware
const { imageUpload } = require('../helpers/image-upload')

router.post(
    '/register',
    imageUpload.single('logo'),
    MarketController.register
   )
router.get('/:id', MarketController.getMarketById)   

module.exports = router