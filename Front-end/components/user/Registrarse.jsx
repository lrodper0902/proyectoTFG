import React, { useRef, useState } from 'react';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Registrarse = () => {
  const passwordInput = useRef(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    const currentType = passwordInput.current.type;
    passwordInput.current.type = currentType === "password" ? "text" : "password";
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const nuevoCliente = {
      nombre,
      apellido,
      telefono,
      email,
      password,
      login: true
    }
    console.log(nuevoCliente)

    try {
      const url = `${Global.url}nuevocliente`;
      const response = await fetch(url, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(nuevoCliente)
      });
      
      console.log(response)
      if(!response.ok){
        throw new Error("Error al conectar con la API");
      }

    } catch (error) {
      console.error("No se ha registrado", error);
    }
  }

  return (
    <div className='contain-login'>
      <div className='login'>
        <div className='imagen-login'>
          <img src="" alt="" />
        </div>
        <div className='form-login '>
          <form className='registrarse' onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <hr />
            <label htmlFor="nombre">Nombre</label><br />
            <input id="nombre" type="text" placeholder='Nombre' name='nombre' onChange={e => setNombre(e.target.value)} required/><br />
            
            <label htmlFor="apellidos">Apellidos</label><br />
            <input id="apellidos" type="text" placeholder='Apellidos' name='apellido' onChange={e => setApellido(e.target.value)} required /><br />
            
            <label htmlFor="telefono">Teléfono</label><br />
            <input id="telefono" type="text" placeholder='Teléfono' name='telefono' onChange={e => setTelefono(e.target.value)} required/><br />
            
            <label htmlFor="email">Correo electrónico</label><br />
            <input id="email" name='email' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} required/><br />
            
            <label htmlFor="password">Password</label><br />
            <input className='passw' ref={passwordInput} name='contraseña' id="password" type="password" onChange={e => setPassword(e.target.value)} placeholder='Contraseña' required />
            
            <button className='icon-password' onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={faEye} />
            </button><br />
            <Link to="/iniciarsesion">Ya tengo una cuenta</Link><br />
            <button type="input">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;
