const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

const multerUser = require('../middlewares/multerUser');
const validations = require('../middlewares/valUser');

router.get('/Login', userController.login)

router.get('/register', userController.register)

router.get('/profile', userController.profile)

router.post('/register', multerUser.single('avatar'),   userController.createUser)



module.exports = router