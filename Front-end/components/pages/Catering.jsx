import React from 'react'

export const Catering = () => {
  return (
    <div className='contain-catering'>
      <div className='cabecera-catering'>
        {/* <img />        */}
        <div>
          <h3>Servicio de Catering</h3> 
          <hr />
          <h4>RESERVAS PARA REUNIONES PRIVADAS, EVENTOS, COMIDAs FAMILIARES O DE EMPRESA</h4>            
          <button><a href="#"></a>Reserva ya</button>
        </div>
      </div>

      <div className='descripcion-catering'>
        <p>Ponemos a su disposición nuestro servicio integral de catering. Trasladamos nuestra cocina al entorno que demande el cliente y ejecutamos, in situ,  los productos de nuestra carta para que su evento sea una experiencia inolvidable. Usted elige dónde y cómo hacer realidad su celebración para ese día tan especial. Consulte nuestros menús y decoraciones, no se equivocará. Somos experiencia y garantía de éxito.</p>
      <hr />
      </div>
      
      <div className='galeria-catering'>
        <img src="/catering/c1.jpg" alt="c1.jpg" />
        <img src="/catering/c2.jpg" alt="c2.jpg" />
        <img src="/catering/c3.jpg" alt="c3.jpg" />
        <img src="/catering/c4.jpg" alt="c4.jpg" />
        <img src="/catering/c5.jpg" alt="c5.jpg" />
        <img src="/catering/c6.jpg" alt="c6.jpg" />
      </div>

      <div className='reservar-catering'>
        <h3>Reserva tu catering</h3>
        <form action="" method="post">
          <div>
            <label htmlFor="">Nombre</label><br />
            <input type="text" /><br />
            <label htmlFor="">Email</label><br />
            <input type="text" /><br />           
          </div>
          <div>
            <label htmlFor="">Teléfono</label><br />
            <input type="tel" /><br />
            <label htmlFor="">Mensaje</label><br />
            <textarea name="text" id=""></textarea>           
          </div>

          <input type="submit" value="Reservar" />

        </form>
      </div>

    </div>
  )
}
