const router = require('express').Router()

const UserController = require('../controllers/UserController')

// Middlewares
const { imageUpload } = require('../helpers/image-upload')
const checkToken = require('../helpers/verify-user-token')

router.post(
    '/register', 
    imageUpload.single('image'), 
    UserController.register
   )
router.post('/login', UserController.login)
router.get('/check-user', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken.verifyToken,UserController.edit)
router.delete('/delete/:id', checkToken.verifyToken, UserController.delete)

module.exports = router