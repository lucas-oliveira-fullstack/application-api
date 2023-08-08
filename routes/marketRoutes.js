const router = require('express').Router()

const MarketController = require('../controllers/MarketController')

// Middleware
const { imageUpload } = require('../helpers/image-upload')

router.post(
    '/register',
    imageUpload.single('logo'),
    MarketController.register
   )
router.get('/:id', MarketController.getMarketById)  
router.patch('/edit/:id', MarketController.edit)
router.delete('/delete/:id', MarketController.delete)

module.exports = router