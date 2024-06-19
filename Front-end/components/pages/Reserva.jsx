import React,  { useEffect, useState } from 'react';
import Calendario from '../elementos/Calendario';

export const Reserva = () => {


  return (
    <div className='contain-reservas'>
      <div className='imagen-reservas'>
        <img src='/salas/decoracion4.jpg' width='100%'/>
      </div>

      <div className='contain-calendario-informacion'>
        <div className='titulo'>
        <h3 className='title'>Reserve su mesa</h3>
         <hr />          
        </div>

        <div className='descripcion-reservas'>
          <p>&emsp;&emsp;Las reservas mediante la página web, se deben hacer con 48 horas de antelación y se darán por materializadas cuando reciban la confirmación de la misma por parte de la atención al cliente del 7 Monjas.</p>
          <p>Nuestras puertas están abiertas para recibirte desde las 13:00 hasta las 18:00 horas, y nuevamente desde las 20:00 hasta las 00:30 horas.</p>
          
          <ul>
            <li><p>Explora nuestros deliciosos platos y elige la fecha y hora que más te convengan para tu visita.</p></li>
            <li><p><b>Reservas sin Pago Anticipado:</b> Si ya estás registrado, disfruta de la comodidad de reservar sin necesidad de realizar pagos adicionales. Simplemente inicia sesión y reserva fácilmente.</p></li>
            <li><p><b>Protegemos tus datos personales y financieros con medidas estrictas de seguridad.</b> Puedes reservar con confianza sabiendo que tus transacciones están seguras.</p></li>
          </ul>
          
          <img  src="catering/reservar.jpg" width='60%' alt="" />
        </div>

        <div className='reservar'>
          {/*Calendario*/}
          <Calendario/>

        </div>        
      </div>


    </div>
  )
}
