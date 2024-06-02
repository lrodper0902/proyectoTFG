import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
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
          </div>
          <div className='form-login'>
            {/* Esto tengo que quietarlo (el Link) y lo que tengo que poner es dos botones con condicional si pincho uno que 
            me salga un componenete y viceversa */}
            {/* <Link to="/iniciarsesion">Iniciar Sesion</Link> */}
            <form>
            <h2>Iniciar Sesión</h2>    
            <hr/>      
              <label htmlFor="">Correo electrónico</label><br />
              <input type="text" placeholder='email' required/><br />
              <label htmlFor="">Password</label><br />
              <input className='passw' ref={passwordInput} id="password" type="password" placeholder='Contraseña' required />
              <button className='icon-password' onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={faEye} />
              </button><br />
              <Link className='boton' to="/registrarse">No tengo cuenta. Registrarme</Link> <br />   
              <button type="submit">Iniciar sesión</button>         
            </form>
          </div>

        </div>
      </div>
    );
  }


export default Login;