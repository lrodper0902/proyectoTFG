import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MyCarousel = () => {
  return (

    <Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="\salas\ccomedor1.jpg"
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="\salas\centrada.jpg"
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="\salas\cterraza.jpeg"
        alt="Third slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="\salas\ccomedor3.jpeg"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
  );
};

export default MyCarousel;
