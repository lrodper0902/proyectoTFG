import React,  { useState } from 'react';
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
          <p>Las reservas mediante la página web, se deben hacer con 48 horas de antelación y se darán por materializadas cuando reciban la confirmación de la misma por parte de la atención al cliente del 7 Monjas.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum numquam quam aperiam sed voluptates, nesciunt nam atque soluta cumque repellat aspernatur architecto in impedit nisi expedita illum quod eveniet velit suscipit, officiis ad, at sunt. Placeat quibusdam repellat obcaecati delectus iusto autem earum nostrum fugiat ipsum tempora est suscipit veniam quisquam iste modi, porro, laboriosam veritatis! Ea ipsa ex maxime quis impedit, omnis et exercitationem reprehenderit laboriosam in quibusdam quidem hic autem aliquid veniam itaque nihil cum. Autem exercitationem animi ad eius. Excepturi quis laudantium ad ea nisi, fugiat tempore neque iusto assumenda amet possimus non illum quia, eligendi eaque voluptate quae quo tempora facere. Architecto et eligendi deleniti. A, itaque quibusdam voluptatum maxime iusto sed quaerat quos quam consequuntur veniam aperiam esse commodi unde illo! Quis unde debitis, minus sequi perferendis saepe itaque sed deleniti labore, hic iste iure magni quidem rerum et. Ad, voluptatum iure. Quibusdam, non.</p>
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
