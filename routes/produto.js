const express = require('express')
var router = express.Router();

var controller = require('../controllers/produto');

router.post('/', controller.incluir);
router.get('/:codigo', controller.buscar);
router.get('/', controller.listar);
router.put('/:codigo', controller.alterar);
router.delete('/:codigo', controller.excluir);

module.exports = router;