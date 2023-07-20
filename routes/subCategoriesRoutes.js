const express = require('express')
const router = express.Router()
const SubcategoryController = require('../controllers/SubcategoryController')

router.get('/', SubcategoryController.showSubcategories)
router.get('/create', SubcategoryController.createSubcategory)
router.post('/create', SubcategoryController.createSubcategorySave)
router.get('/edit/:id', SubcategoryController.updateSubcategory)
router.post('/edit', SubcategoryController.updateSubcategoryPost)
router.post('/remove', SubcategoryController.removeSubcategory)

module.exports = router