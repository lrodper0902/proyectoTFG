import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Global } from '../../helpers/Global';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInput = useRef(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    const currentType = passwordInput.current.type;
    passwordInput.current.type = currentType === 'password' ? 'text' : 'password';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Global.url}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (data.rol === 'admin') {
          navigate('/app/reservas');
        } else {
          navigate('/app/cliente');
        }
      } else {
        alert('Fallo al iniciar sesión, verifica tus credenciales');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className='contain-login'>
      <div className='login'>
        <div className='imagen-login'></div>
        <div className='form-login'>
          <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <hr />
            <label htmlFor="email">Correo electrónico</label><br />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email'
              required
            /><br />
            <label htmlFor="password">Password</label><br />
            <input
              className='passw'
              ref={passwordInput}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
              required
            />
            <button className='icon-password' onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={faEye} />
            </button><br />
            <Link className='boton' to="/registrarse">No tengo cuenta. Registrarme</Link><br />
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
