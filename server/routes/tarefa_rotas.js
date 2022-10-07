const express = require('express');
const router = express.Router();

const controller = require('../controllers/task_controller')

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.delete('/', controller.deleteAll);

module.exports = router;