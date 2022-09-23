const express = require('express');
const router = express.Router();

const controller = require('../controllers/projeto_controller')

// encaminhada a partir de /api/produtos

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.inserir);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

// exportando o recurso router
module.exports = router;