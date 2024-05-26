import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='contain-login'>
      <div className='login'>
        <div className='imagen-login'>
        </div>
        <div className='form-login'>
          {/* Esto tengo que quietarlo (el Link) y lo que tengo que poner es dos botones con condicional si pincho uno que 
          me salga un componenete y viceversa */}
          {/* <Link to="/iniciarsesion">Iniciar Sesion</Link> */}
          
          <Link to="/registrarse">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;