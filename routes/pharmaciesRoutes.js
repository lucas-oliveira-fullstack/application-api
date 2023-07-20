const express = require('express')
const router = express.Router()
const PhamarcyController = require('../controllers/PharmacyController')

router.get('/', PhamarcyController.showPharmacies)
router.get('/create', PhamarcyController.createPharmacy)
router.post('/create', PhamarcyController.createPharmacySave)
router.get('/edit/:id', PhamarcyController.updatePharmacy)
router.post('/edit', PhamarcyController.updatePharmacyPost)
router.post('/remove', PhamarcyController.removePharmacy)

module.exports = router