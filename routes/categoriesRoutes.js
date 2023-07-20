const express = require('express')
const router = express.Router()
const CategoryCotroller = require('../controllers/CategoryController')

router.get('/', CategoryCotroller.showCategories)
router.get('/create', CategoryCotroller.createCategory)
router.post('/create', CategoryCotroller.createCategorySave)
router.get('/edit/:id', CategoryCotroller.updateCategory)
router.post('/edit', CategoryCotroller.updateCategoryPost)
router.post('/remove', CategoryCotroller.removeCategory)

module.exports = router