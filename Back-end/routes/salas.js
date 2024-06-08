const express = require('express');
const router = express.Router();
const SalaController = require('../controller/salas');

router.get('/salas', SalaController.getAllSalas);
router.get('/obtenersala/:id', SalaController.getSala);

module.exports = router;