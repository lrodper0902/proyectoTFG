//Impotamos express para obtener los metodos, post, get, delete, put
const express = require("express");
const router = express.Router();
const ReservaController = require("../controller/reserva");

router.get('/listareservas', ReservaController.getAllReservas);
router.post('/crearreservas', ReservaController.createReserva);
router.put('/actualizarreservas/:id', ReservaController.updateReserva);
router.delete('/eliminarreservas/:id', ReservaController.deleteReserva);
// router.post('/reservaspuntual/:salaid', ReservaController.createReservaPuntual);
router.get('/disponibilidad', ReservaController.verificarCapacidad);
router.post('/reservas', ReservaController.crearReserva);

//Export 
module.exports = router;
