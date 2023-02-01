const mainController = require('../controllers/mainController')

const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multerDoctors')

router.get('/', mainController.home)
router.get('/appointment/:id', mainController.appointment)
router.get('/doctor', mainController.doctor)
router.get('/add', mainController.add)

router.post('/createDoctor', multer.single('avatar'), mainController.createDoctor)
router.post('/newTurn', mainController.newTurn)



module.exports = router
