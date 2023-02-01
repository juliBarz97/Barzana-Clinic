const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

const multerUser = require('../middlewares/multerUser');
const validationsUser = require('../middlewares/valUser');
const userLogged = require('../middlewares/userLogged')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')



router.get('/Login', guestMiddleware, userController.login)
router.get('/logout', userController.logout)

router.get('/register', guestMiddleware, userController.register)

router.get('/profile', authMiddleware , userController.profile)

router.post('/register', multerUser.single('avatar'), validationsUser,   userController.createUser)

router.post('/validLogin', userLogged,  userController.validLogin)

module.exports = router