import React, { useEffect, useState } from 'react'
import MyCarousel from '../elementos/MyCarousel';
import { Link } from 'react-router-dom';

export const Inicio = () => {

  //Carrusel de la carta
  const images = [
    '/productos/quisquilla.jpeg', 
    '/productos/boquerones.jpg',
    '/productos/atun.jpg',
    '/productos/cigalas.jpeg',
    '/productos/lomo.jpg',
  ];

  const images2 = [
    '/platos/croquetas.jpg', 
    '/platos/perdiz.jpg',
    '/platos/jamon.jpg',
    '/platos/calamarfrito.jpg',
    '/platos/queso.jpg',
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
      <MyCarousel />
      <div className="introduction">
        <h3>Come con Nosotros, come en 7 Monjas</h3>
        <hr />
        <p>Restaurante 7 Monjas te ofrece un lugar donde sentirte especial. El confort, un servicio esmerado y una gastronomía de primer nivel, convierten al Restaurante 7 Monjas en una cita ineludible de la restauración Granadina.</p>
        <p>La sobriedad y el soporte de una materia prima de primera calidad, con unos toques de vanguardia, es la base de la estrategia comercial del Restaurante 7 Monjas.</p>
        <p>Ubicado en una ciudad  de interior, se distingue, sin embargo, por la calidad en el pescado y marisco así como en la ejecución y trato de los mismos. Una larga trayectoria profesional ligada al complejo mundo del pescado y más de 50 años en la hostelería se plasman en la mesa del 7Monjas .</p>
        <p>Completan nuestra oferta las inigualables carnes de la zona así como productos de otra índole que podrán encontrar en nuestra carta y menús degustación.</p>
      </div>

      <div className="content-indice">
      <div className='text'>
          <h3 className='title'>Carta</h3>
          <hr />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fuga laudantium minus veritatis deserunt nihil repudiandae voluptatem enim mollitia non atque iure sequi nisi, libero voluptate illo ab facilis. Sed incidunt, numquam accusantium provident tenetur esse mollitia, at minus tempora impedit rerum aut nam eligendi reprehenderit id quos eum recusandae, deserunt hic tempore rem. Deserunt, numquam. Magnam beatae modi accusamus repellat dolores architecto non placeat, ullam autem? Dolorum consectetur perspiciatis, placeat dignissimos modi error minus? Nesciunt iusto assumenda rem asperiores consectetur esse unde architecto ducimus! Vel expedita excepturi odio accusamus!</p>
          <Link to="/carta" className="link-button">Ver la Carta</Link>
        </div>

        <div className="fade-carousel">
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

        <div className="fade-carousel">
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
     
        <div className='text'>
          <h3>Expresión y elegancia en 7 Monjas</h3>
          <hr />
          <p>Seleccionamos en origen los productos y materias primas con los que se elaborarán los platos de nuestra carta:</p>
          <p>Una certera lista de productos excelsos, tratados con maestría, en la que podrás encontrar lo mejor de la cocina mediterránea.</p>
          <p>Vinos de primera calidad de las mejores Denominaciones de Origen y un servicio esmerado redondean nuestra propuesta gastronómica. Distinguirán la exigencia y prurito profesional en el restaurante 7 Monjas.</p>
        </div>


      </div> 

      <div className='imagen-footer'>
        <img src="/7monjas/footer.jpg" width='100%' alt="" />
      </div>
    </>
  );
};


export default Inicio;
