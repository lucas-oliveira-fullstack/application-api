const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/register', UserController.personalData)
router.get('/register/create-send-code', UserController.createSendCode)
router.post('/register/confirm-email', UserController.confirmEmail)
router.post('/register/profile-image', UserController.profileImage)
router.post('/register/address', UserController.address)

module.exports = router