const mainController = require('../controllers/mainController')

const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multerDoctors')

router.get('/', mainController.home)
router.get('/appointment/:id', mainController.appointment)
router.get('/doctor', mainController.doctor)
router.get('/add', mainController.add)

router.post('/createDoctor', multer.single('avatar'), mainController.createDoctor)
router.post('/newTurn/:id', mainController.newTurn)
router.delete('/cancelTurn/:id', mainController.cancelTurn)

// APIs

router.get('/areaAPI',mainController.areaAPI)
router.get('/doctorsAPI', mainController.doctorsAPI)
router.get('/lastDocAPI',mainController.lastDocAPI)
router.get('/turnAPI', mainController.turnAPI)
router.get('/UsersAPI', mainController.UsersAPI)
router.get('/docAreaAPI', mainController.docAreaAPI)


module.exports = router
