const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

// Middleware
const { imageUpload } = require('../helpers/image-upload')
const verifyToken = require('../helpers/check-token')

router.post('/personal-data', UserController.personalData)
router.post('/create-send-code', UserController.createSendCode)
router.post('/confirm-email', UserController.confirmEmail)
router.post('/profile-image', imageUpload.single('photo'), UserController.profileImage)
router.post('/address', UserController.address)
router.post('/register', UserController.register)
router.post('/login-email', UserController.loginByEmail)
router.post('/login-cell', UserController.loginByCell)
router.patch('/reset-password-email', UserController.resetPasswordByEmail)
router.patch('/reset-password-cell', UserController.resetPasswordByCell)
router.get('/check-user', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single('photo'), UserController.editUser)
router.delete('/delete', verifyToken, UserController.deleteUser)

module.exports = router