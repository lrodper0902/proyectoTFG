import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Registrarse = () => {
  const passwordInput = useRef(null);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    const currentType = passwordInput.current.type;
    passwordInput.current.type = currentType === "password" ? "text" : "password";
  }

  return (
    <div className='contain-login'>
      <div className='login'>
        <div className='imagen-login'>
          <img src="" alt="" />
        </div>
        <div className='form-login '>
          <form className='registrarse'>
            <h2>Registrarse</h2>
            <hr />
            <label htmlFor="nombre">Nombre</label><br />
            <input id="nombre" type="text" placeholder='Nombre' required/><br />
            <label htmlFor="apellidos">Apellidos</label><br />
            <input id="apellidos" type="text" placeholder='Apellidos' required /><br />
            <label htmlFor="telefono">Teléfono</label><br />
            <input id="telefono" type="text" placeholder='Teléfono' required/><br />
            <label htmlFor="email">Correo electrónico</label><br />
            <input id="email" type="email" placeholder='Email' required/><br />
            <label htmlFor="password">Password</label><br />
            <input className='passw' ref={passwordInput} id="password" type="password" placeholder='Contraseña' required />
            <button className='icon-password' onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={faEye} />
            </button><br />
            <Link to="/iniciarsesion">Ya tengo una cuenta</Link><br />
            <button type="button" onClick={togglePasswordVisibility}>Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;
