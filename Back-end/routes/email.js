const express = require("express");
const router = express.Router();
const EmailController = require('../email');

router.post('/send-email', EmailController.sendEmail);


module.exports = router;