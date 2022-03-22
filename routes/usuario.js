const express = require('express')
var router = express.Router();

var controller = require('../controllers/usuario');

router.post('/',controller.incluir)
router.post('/login',controller.login)


module.exports = router;