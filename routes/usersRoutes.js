const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.showUsers)
router.get('/create', UserController.createUser)
router.post('/create', UserController.createUserSave)
router.get('/edit/:id', UserController.updateUser)
router.post('/edit', UserController.updateUserPost)
router.post('/remove', UserController.removeUser)

module.exports = router