const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quiquerestaurantebaza@gmail.com',
    pass: 'restaurante'
  }
});

exports.sendEmail = (req, res) => {
    console.log("Ha entrado a la base de datos")
    const { name, email, phone, message } = req.body;
    console.log(name + email + phone + message )
  const mailOptions = {
    from: 'quiquerestaurantebaza@gmail.com',
    to: email,
    subject: 'Confirmación de Reserva de Catering',
    text: `Hola ${name}, gracias por reservar nuestro servicio de catering. \nMensaje: ${message}\nNos pondremos en contacto contigo al teléfono: ${phone}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send({ message: 'Error al enviar el correo', error });
    } else {
      console.log('Email enviado: ' + info.response);
      res.send({ message: 'Correo enviado correctamente' });
    }
  });
};
