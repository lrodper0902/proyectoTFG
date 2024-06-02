//Impotamos express para obtener los metodos, post, get, delete, put
const express = require("express");
const router = express.Router();
const MesaController = require("../controller/mesa");

router.get('/mesa', MesaController.getAllMesas);
router.get('/mesa/:id', MesaController.getMesa);
router.post('/mesa', MesaController.createMesa);
router.put('/mesa/:id', MesaController.updateMesa);
router.delete('/mesa/:id', MesaController.deleteMesa);

//Export 
module.exports = router;
