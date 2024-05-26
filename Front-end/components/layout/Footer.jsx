import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhoneFlip, faRoute } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <footer>
      <div className="footer">
 
        <div className="redes-sociales">
          <img src="/7monjas/7monjas.png" />
          <div className='iconos-redes'>
            <a className='red-social instagram' href="https://www.instagram.com/restaurante7monjas/?hl=es" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a className='red-social twitter' href="https://twitter.com/7monjas" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a className='red-social facebook' href="https://www.facebook.com/7monjas/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
          </div>
        </div>

        <div className='contacto'>
          <div>
            <FontAwesomeIcon icon={faEnvelope} size='2x'/>
            <p> reservas@restaurante7monjas.com</p>
          </div>
          <div>
          <FontAwesomeIcon icon={faPhoneFlip} size='2x'/>
            <p>+34 695 16 33 75</p> 
          </div>
          <div>
          <FontAwesomeIcon icon={faRoute} size='2x' />
            <p>Calle Monjas, 7, 18800 Baza</p>
          </div>
        </div>
        
        <hr/>

        <div className="copy">
          <p> © 2024 Copyright 2024 | Laura Rodríguez Perales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
