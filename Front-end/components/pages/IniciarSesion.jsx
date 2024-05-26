import React from 'react';
import { Link } from 'react-router-dom';

const IniciarSesion = () => {
  return (
    <div className='contain-login'>
      <div className='login'>
        <div className='imagen-login'>
          <img src="" alt="" />
        </div>
        <div className='form-login'>
          <Link to="/registrarse">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;