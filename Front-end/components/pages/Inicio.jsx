import React, { useEffect, useState } from 'react'
import MyCarousel from '../elementos/MyCarousel';
import { Link } from 'react-router-dom';

export const Inicio = () => {

  //Carrusel de la carta
  const images = [
    '/salas/fachada.jpg',   
    '/salas/comedor1.jpg',     
    '/salas/mesasaltas3.jpg',
    '/salas/comedor2.0.jpg', 
    '/salas/cterraza.jpeg',
  ];

  const images2 = [

    '/platos/croquetas.jpg', 
    '/platos/perdiz.jpg',
    '/platos/plato5.jpg',
    '/platos/plato3.jpeg',
    '/platos/plato1.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3500);
    return () => clearInterval(intervalId);
  }, []); 


  return (
    <>
      {/* <MyCarousel /> */}
      <div className='imagen-inicio'>
        {/* <img src="/7monjas/inicio.jpeg" width='100%' alt="" /> */}
        <div className='introduccion-7monjas'>
          <div>
            <h2>Come con nosotros, come con Restaurante 7 Monjas</h2>
            <hr />
            <p>Restaurante 7 Monjas te ofrece un lugar donde sentirte especial. El confort, un servicio esmerado y una gastronomía de primer nivel, convierten al Restaurante 7 Monjas en una cita ineludible de la restauración Granadina.</p>
            <p>La sobriedad y el soporte de una materia prima de primera calidad, con unos toques de vanguardia, es la base de la estrategia comercial del Restaurante 7 Monjas.</p>
          </div>
          <Link to="/carta" className="link-button">Ver la Carta</Link>
        </div>
      </div>

      <div className="content-indice">
        <div className='text carta-text'>
          <h3 className='title'>Una experiencia inovidable</h3>
          <hr />
          <p>Restaurante a la carta, basada en una cocina mediterránea y de escuela andaluza con toques de vanguardia.
          Podrás elegir entre platos con verduras, entrantes fríos, escabeches, salazones, marisco, pescados, arroces, calderetas y carnes; así como nuestros deliciosos postres caseros.</p>
          <p> Las mejores raciones de Granada: Pescado en adobo, anchoas del Cantábrico, Jamones Ibéricos, patés, croquetas caseras, marisco cocido o a la plancha, carnes para compartir y elaborados postres caseros.</p>
          <p>Tipo de cocina: Mediterránea – Andaluza</p>
          <p>Destaca: Posibilidad de elegir menú degustación (con antelación) o menú de temporada.</p>
          <p>Horario: Almuerzo y Cena</p>
          <p>Precio Medio: 35€</p>
          <p>Nota de Interés: Fundado en 2017, el restaurante 7 monjas, se sitúa desde el primer día a la vanguardia de la gastronomía  granadina y se convierte en referencia de personas de paso,  así como de su amplia clientela de Andalucía Oriental.</p>
        </div>

        <div className="fade-carousel img1">
          {images2.map((image, index) => (
            <div
              key={index}
              className={`fade-carousel__image ${
                index === currentImageIndex ? 'fade-carousel__image--active' : ''
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>



        <div className="fade-carousel img2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`fade-carousel__image ${
                index === currentImageIndex ? 'fade-carousel__image--active' : ''
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
     
        <div className='text productos-text'>
          <h3>Expresión y elegancia en 7 Monjas</h3>
          <hr />
          <p>Seleccionamos en origen los productos y materias primas con los que se elaborarán los platos de nuestra carta:</p>
          <p>Una certera lista de productos excelsos, tratados con maestría, en la que podrás encontrar lo mejor de la cocina mediterránea.</p>
          <p>Vinos de primera calidad de las mejores Denominaciones de Origen y un servicio esmerado redondean nuestra propuesta gastronómica. Distinguirán la exigencia y prurito profesional en el restaurante 7 Monjas.</p>
        </div>


      </div> 
      <div className='reservar-boton-inicio'>
        <div>
          <h2>Reserva con nosotros</h2>
          <Link to='/reservas' className='boton-reservar'>Reservar</Link>          
        </div>
      </div>

    </>
  );
};


export default Inicio;
