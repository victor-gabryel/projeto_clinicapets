const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentsController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);

// ✅ rota só para status
router.patch('/:id/status', controller.updateStatus);

router.delete('/:id', controller.remove);

module.exports = router;
