const mainController = require('../controllers/mainController')

const express = require('express');
const router = express.Router();

router.get('/', mainController.home)
router.get('/appointment', mainController.appointment)
router.get('/doctor', mainController.doctor)
router.get('/add', mainController.add)



module.exports = router
