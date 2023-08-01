const express = require('express')
const router = express.Router()

const UserRegisterController = require('../controllers/UserRegisterController')

// Middleware
const { imageUpload } = require('../helpers/image-upload')

router.post('/personal-data', UserRegisterController.personalData)
router.post('/create-send-code', UserRegisterController.createSendCode)
router.post('/confirm-email', UserRegisterController.confirmEmail)
router.post('/profile-image', imageUpload.single('photo'), UserRegisterController.profileImage)
router.post('/address', UserRegisterController.address)
router.post('/register', UserRegisterController.register)

module.exports = router