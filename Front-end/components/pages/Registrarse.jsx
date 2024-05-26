import React from 'react';
import { Link } from 'react-router-dom';

const Registrarse = () => {
  return (
    <div className='contain-login'>
      <div className='login'>
        <div className='imagen-login'>
          <img src="" alt="" />
        </div>
        <div className='form-login'>
          <Link to="/iniciarsesion">Iniciar Sesion</Link>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;