import React from 'react'

export const Vinos = () => {
  return (
    <div className='vino-contain'>
      <section className='imagen-principal-vinos'>
        <h3>Nuestros Vinos</h3>
      </section>
      
      <main>
        <section className='seccion-vinos'>
        <article>
            <img src="/7monjas/rueda.jpg" alt="" />
            <h4>Bodega</h4>
            <p>rueda Verdejo</p>
            <p>Yllera 5.5</p>
            <p>José Pariente</p>
            <p>Enate Blanco 234 Chardonnay</p>
            <p>Mar de Frades</p>
            <p>Albariño Martín Codax</p>
            <p>Jaume Serra Brut Nature</p>
            <p>Juvé y camps</p>
            <p></p>
          </article>
          <article>
            <img src="/7monjas/luicañas.jpg" alt="" />
            <h4>Rioja</h4>
            <p>Vino de la casa</p>
            <p>Luis de cañas crianza</p>
            <p>Ramón Bilbao crianza</p>
            <p>Remelluri Reserva</p>
          </article>
          <article>
            <img src="/7monjas/protos.jpg" alt="" />
            <h4>Tintos</h4>
            <p>Vino de la casa</p>
            <p>Finca Resalso</p>
            <p>Protos Roble</p>
            <p>Matarromera crianza</p>
            <p>Pago de las capellanes crianza</p>
            <p>Pago de carraovejas crianza</p>
          </article>
 
        </section>

        <section className='descripcion-vinos'>
          <article className='descripcio-rioja'>
            <p>La Rioja es una región emblemática de España conocida por sus vinos de renombre mundial. Situada en el norte del país, abarca paisajes pintorescos que van desde colinas ondulantes hasta majestuosos viñedos. Su rica tradición vinícola se remonta siglos atrás, combinando técnicas ancestrales con innovación moderna para producir vinos distintivos y de alta calidad. </p>
          </article>
          <article className='descripcio-ribera'>
            <p>La Ribera del Duero es una reconocida región vinícola en el norte de España, famosa por sus vinos tintos de alta calidad. Situada a lo largo del río Duero, esta región combina un terreno diverso con un clima continental extremo. Principalmente conocida por la uva Tinta del País (Tempranillo), sus vinos se caracterizan por su robustez, estructura y notas de frutos negros y especias.</p>
          </article>
          <article className='descripcio-blanco'>
            <p>Fresco y versátil, el vino blanco se elabora mayormente con uvas de pulpa blanca como Chardonnay y Sauvignon Blanc. Ideal para mariscos y platos ligeros, ofrece sabores frutales y florales con un perfil refrescante.</p>
            <p>Los cavas son espumosos españoles con Denominación de Origen Cava, elaborados en Cataluña. Con burbujas elegantes y aromas a frutas frescas, van desde seco hasta dulce. Perfectos para celebraciones y maridajes con aperitivos y postres.</p>
          </article>
        </section>
      </main>
    </div>
  )
}
