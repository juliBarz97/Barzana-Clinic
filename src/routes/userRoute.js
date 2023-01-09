const userController = require('../controllers/userController')

const express = require('express');
const router = express.Router();



router.get('/Login', userController.login)

router.get('/register', userController.register)

router.get('/profile', userController.profile)





module.exports = router