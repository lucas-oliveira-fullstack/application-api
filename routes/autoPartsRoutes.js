const express = require('express')
const router = express.Router()
const AutoPartController = require('../controllers/AutoPartController')

router.get('/', AutoPartController.showAutoParts)
router.get('/create', AutoPartController.createAutoPart)
router.post('/create', AutoPartController.createAutoPartSave)
router.get('/edit/:id', AutoPartController.updateAutoPart)
router.post('/edit', AutoPartController.updateAutoPartPost)
router.post('/remove', AutoPartController.removeAutoPart)

module.exports = router