import React, { useEffect, useState } from 'react'
import MyCarousel from '../elementos/MyCarousel';

export const Inicio = () => {

  //Carrusel de la carta
  const images = [
    'https://th.bing.com/th/id/R.6dfa90ceb4a03503dc287a99030b4a02?rik=xgzmzXxaEaxkGA&pid=ImgRaw&r=0',
    'https://images.squarespace-cdn.com/content/v1/5c347447af2096faeae7aceb/a8a55bf0-df8d-4183-a3f7-be794fa63e07/Bannau+Brycheiniog%2C+Pen+Y+fan+From+Cwm+Gwdi.jpg?format=1000w',
    'https://th.bing.com/th/id/R.3621356be6854df64024b9e9f8b72814?rik=jTUBaxI%2ffxneAw&riu=http%3a%2f%2falafran.nl%2fwp-content%2fgallery%2ftestgallery%2fLandschap-100-x-100-cm-klb.jpg&ehk=6L1E20gdB4z%2bkC%2f%2fzVVKUPEC4%2foaM0THfMzmkb8qq7U%3d&risl=&pid=ImgRaw&r=0',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);
    return () => clearInterval(intervalId);
  }, []); 


  return (
    <>
      <MyCarousel />
      <div className="introduction">
        <p>7 Monjas es un restaurante situado en pleno centro histórico de Baza, a pocos metros de la Plaza Mayor, el Museo Arqueológico y a solo unos minutos a pie de las principales calles comerciales. Regentado por profesionales con una larga trayectoria en el sector, nace para satisfacer la demanda de una gastronomía de calidad y completar el círculo de la hostelería Granadina.</p>
        <p>Restaurante 7 Monjas te ofrece un lugar donde sentirte especial. El confort, un servicio esmerado y una gastronomía de primer nivel, convierten al Restaurante 7 Monjas en una cita ineludible de la restauración Granadina.</p>
        <p>La sobriedad y el soporte de una materia prima de primera calidad, con unos toques de vanguardia, es la base de la estrategia comercial del Restaurante 7 Monjas.</p>
      </div>

      <div className="content-indice">
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
     
        <div>
          <p>Seleccionamos en origen los productos y materias primas con los que se elaborarán los platos de nuestra carta:</p>
          <p>Una certera lista de productos excelsos, tratados con maestría, en la que podrás encontrar lo mejor de la cocina mediterránea.</p>
          <p>Vinos de primera calidad de las mejores Denominaciones de Origen y un servicio esmerado redondean nuestra propuesta gastronómica. Distinguirán la exigencia y prurito profesional en el restaurante 7 Monjas.</p>
        </div>

        <div>
          <p>Seleccionamos en origen los productos y materias primas con los que se elaborarán los platos de nuestra carta:</p>
          <p>Una certera lista de productos excelsos, tratados con maestría, en la que podrás encontrar lo mejor de la cocina mediterránea.</p>
          <p>Vinos de primera calidad de las mejores Denominaciones de Origen y un servicio esmerado redondean nuestra propuesta gastronómica. Distinguirán la exigencia y prurito profesional en el restaurante 7 Monjas.</p>
        </div>

        <div>
          <img src='https://th.bing.com/th/id/R.3621356be6854df64024b9e9f8b72814?rik=jTUBaxI%2ffxneAw&riu=http%3a%2f%2falafran.nl%2fwp-content%2fgallery%2ftestgallery%2fLandschap-100-x-100-cm-klb.jpg&ehk=6L1E20gdB4z%2bkC%2f%2fzVVKUPEC4%2foaM0THfMzmkb8qq7U%3d&risl=&pid=ImgRaw&r=0' alt="" />
        </div>
      </div>   
      
    </>
  );
};


export default Inicio;
