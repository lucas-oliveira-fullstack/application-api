const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.showUsers)
router.get('/create', UserController.createUser)
router.post('/create', UserController.createUserSave)

module.exports = router