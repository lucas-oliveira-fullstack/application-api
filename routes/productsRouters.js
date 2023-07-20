const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.showProducts)
router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductSave)
router.get('/edit/:id', ProductController.updateProduct)
router.post('/edit', ProductController.updateProductPost)
router.post('/remove', ProductController.removeProduct)

module.exports = router