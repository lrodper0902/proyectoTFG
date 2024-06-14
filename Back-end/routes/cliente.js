//Impotamos express para obtener los metodos, post, get, delete, put
const express = require("express");
const router = express.Router();
const ClienteController = require("../controller/cliente");

router.get('/todosclientes', ClienteController.getAllClientes);
router.get('/clienteporid/:id', ClienteController.getCliente);
router.post('/nuevocliente', ClienteController.createCliente);
router.put('/actualizarcliente/:id', ClienteController.updateCliente);
router.delete('/eliminarcliente/:id', ClienteController.deleteCliente);
router.post('/login', ClienteController.login);

module.exports = router;