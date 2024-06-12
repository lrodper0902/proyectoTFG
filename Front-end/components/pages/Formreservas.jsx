import React, {useState} from 'react';
import { Global } from '../../helpers/Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCalendarDays, faLock } from '@fortawesome/free-solid-svg-icons';
import Calendario from '../elementos/Calendario';


export const Formreservas = ({ date, comensales, hora, comida, selectedSala }) => {
    const [showFormReservas, setShowFormReservas] = useState(false);
    // const [idCliente, setIdCliente] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    
    const handleBack = () => {
        setShowFormReservas(true); 
    }

    const handlereservaUsuarioLogeado = async(e) => {
    //Ususario con cuenta
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        try {
            const response = await fetch(`${Global.url}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password}),
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                document.cookie = `auth_token=${data.token}; path=/; max-age=3600; secure; httponly; samesite=strict`;
                // setIdCliente(data.idCliente);
                if(data.idCliente){
                    
                }
            } else {
                alert('Fallo al iniciar sesión, verifica tus credenciales');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    
    }

    const handleReserva = async (e) => {
      e.preventDefault();

      // Datos de la reserva
      const reserva = {
        fecha: date.toISOString().split('T')[0], // Formatea la fecha al formato YYYY-MM-DD
        hora,
        nombre,
        apellido,
        telefono,
        email,
        salaId: selectedSala,
        comensales,
        tiempo: comida
      };
  
      // Llamada al endpoint para crear la reserva
      try {
        const response = await fetch(`${Global.url}/reservas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reserva),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert('Reserva creada correctamente');
        } else {
          alert(`Error al crear la reserva: ${data.message}`);
        }
      } catch (error) {
        console.error('Error al realizar la reserva:', error);
        alert('Error al realizar la reserva');
      }
    };

    if (showFormReservas) {
      return <Calendario />;  
    }

  return (
    <div className='div-reservas-pago-cuenta'>
       <div className="cuenta">
          <h4>Ya tengo cuenta</h4>
          <form onSubmit={handlereservaUsuarioLogeado}>
            <div>
              <label htmlFor="">Correo electrónico:</label>
              <input  placeholder='Correo electrónico'required type="text" name="" id="" />

              <label htmlFor="">Contraseña</label>
              <input placeholder='Contraseña'  required type="password" name="" id="" />              
            </div>
            <input type="submit" value="reservar" />
          </form>
        </div>

        <hr  className='hr-form'/>

        <form onSubmit={handleReserva} className='form-pago'>
        <div className="informacion">
            <div>
              <h4>Resumen de la reserva</h4>
              <p><strong>Precio reserva:</strong> 30€</p>
              <p><strong>Local:</strong> Restaurante 7 Monjas</p>
              <p><strong>Dirección:</strong> Calle Monjas, 7, 18800 Baza</p>
              <p><strong>Fecha:</strong> {date.toLocaleDateString()} {hora}</p>
            </div>
          </div>

          <div className='formulario-pago'>
            
            <label htmlFor="">Nombre</label>
            <input
              placeholder='Nombre'
              required
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="">Apellido</label>
            <input
              placeholder='apellido'
              required
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />

            <label htmlFor="">Email</label>
            <input
              placeholder='email'
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="">Teléfono</label>
            <input
              placeholder='Teléfono'
              required
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

          </div>

          <h3>Pagar con tarjeta</h3>
          {/* Proceder al pago */}
          <div className='proceder-pago-tarjeta'>
            <label htmlFor="">Nº de tarjeta:</label>
            <FontAwesomeIcon icon={faCreditCard} />
            <input placeholder='0000 0000 0000 0000' className='numero-tarjeta' type="text" required name="" id="" />

            <label htmlFor="">Caducidad:</label>
            <FontAwesomeIcon icon={faCalendarDays} />
            <input className='mm-aa' type="text" name="" placeholder='mm' id="" />
            <input className='mm-aa' type="text" name="" placeholder='aa' id="" /><br />

            <label htmlFor="">CVV:</label>
            <FontAwesomeIcon icon={faLock} />
            <input placeholder='123' className='cvv' type="text" name="" id="" /><br />

            <div className="btn">
              <input type="button" value="Atrás" onClick={handleBack} />
              <input type="submit" value="Reservar" />
            </div>

          </div>
         
        </form>
 
    </div>
  )
}