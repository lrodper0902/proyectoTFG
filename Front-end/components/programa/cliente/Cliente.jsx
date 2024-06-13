import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';

const Cliente = () => {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  // Obtener el ID del cliente desde localStorage
  const clienteId = localStorage.getItem('clienteId');

  useEffect(() => {
    const obtenerReservas = async () => {
      if (!clienteId) {
        console.error('ID de cliente no disponible');
        return;
      }

      try {
        const response = await fetch(`${Global.url}reservas/user/${clienteId}`);
        if (response.ok) {
          const data = await response.json();
          setReservas(data);
        } else {
          console.error('Error al obtener las reservas');
        }
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    obtenerReservas();
  }, [clienteId]);

  return (
    <div className="contain-reservas-app">
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <nav>
          {/* Aquí debería estar tu componente Sidebar si lo tienes */}
          <Sidebar />
        </nav>
        <main>
          <h1>Mis Reservas</h1>
          <ul>
            {reservas.map((reserva) => (
              <li key={reserva.idReserva}>
                <p>Fecha: {reserva.fecha}</p>
                <p>Hora: {reserva.hora}</p>
                <p>Sala: {reserva.salaNombre}</p>
                <p>Comensales: {reserva.comensales}</p>
                <p>Tiempo: {reserva.tiempo}</p>
                <p>Estado: {reserva.estado}</p>
                <p>Precio Pagado: {reserva.precioPagado}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Cliente;
