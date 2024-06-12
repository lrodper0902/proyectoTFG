import React, {useState} from 'react';
import { Global } from '../../helpers/Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCalendarDays, faLock } from '@fortawesome/free-solid-svg-icons';
import Calendario from '../elementos/Calendario';


export const Formreservas = ({ date, comensales, hora, comida, selectedSala }) => {
    const [showFormReservas, setShowFormReservas] = useState(false);
    const [idCliente, setIdCliente] = useState('');
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
    <div >
       <div className="cuenta">
            <h4>Ya tengo cuenta</h4>
            <form onSubmit={handlereservaUsuarioLogeado}>
                <label htmlFor="">Correo electrónico:</label><br />
                <input required type="text" name="" id="" /><br />

                <label htmlFor="">Contraseña</label><br />
                <input  required type="password" name="" id="" /><br />

                <input type="submit" value="reservar" />
            </form>
        </div>

        <form onSubmit={handleReserva}>
            <label htmlFor="">Nombre</label><br />
            <input
              required
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="">Apellido</label><br />
            <input
              required
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />

            <label htmlFor="">Email</label><br />
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="">Teléfono</label><br />
            <input
              required
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <hr />
            <div className="informacion">
                <div>
                    <p><strong>Precio reserva:</strong></p>
                    <p><strong>Local:</strong></p>
                    <p><strong>Dirección:</strong></p>
                    <p><strong>Fecha:</strong></p>
                </div>
                <div>
                    <p>30€</p>
                    <p>Restaurante 7 Monjas</p>
                    <p>Calle Monjas, 7, 18800 Baza</p>
                    <p>{date.toLocaleDateString()} {hora}</p>
                </div>
            </div>

            <h3>Pagar con tarjeta</h3>
            {/* Proceder al pago */}
            <label htmlFor="">Nº de tarjeta:</label>
            <FontAwesomeIcon icon={faCreditCard} /><br />
            <input type="text" required name="" id="" /><br />

            <label htmlFor="">Caducidad:</label>
            <FontAwesomeIcon icon={faCalendarDays} /><br />
            <input type="text" name="" placeholder='mm' id="" /><br />
            <input type="text" name="" placeholder='aa' id="" /><br />

            <label htmlFor="">CVV:</label>
            <FontAwesomeIcon icon={faLock} />
            <input type="text" name="" id="" />

            <input type="submit" value="Reservar" />

            <input type="button" value="Atrás" onClick={handleBack} />
        </form>
 
    </div>
  )
}