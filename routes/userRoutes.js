const router = require('express').Router()

const UserController = require('../controllers/UserController')

// Middlewares
const { imageUpload } = require('../helpers/image-upload')

router.post(
    '/register', 
    imageUpload.single('image'), 
    UserController.register
   )
router.post('/login', UserController.login)

module.exports = router