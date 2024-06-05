import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Crearreserva = () => {
  const [listaSala, setListaSala] = useState([]);
  const [listaMesas, setListaMesas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedComensales, setSelectedComensales] = useState('');
  const [selectedMesa, setSelectedMesa] = useState('');

  useEffect(() => {
    obtenerListaSalas();
  }, []);

  const obtenerListaSalas = async () => {
    try {
      // Realiza la consulta a tu base de datos directamente desde el frontend
      const response = await fetch('/api/salas');
      if (!response.ok) {
        throw new Error('Error al obtener las salas');
      }
      const data = await response.json();
      setListaSala(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const obtenerMesasPorSala = async (idSala) => {
    try {
      const url = `/api/mesaporid/${idSala}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener las mesas para la sala seleccionada');
      }
      const data = await response.json();
      const mesasLibres = data.filter(m => m.estado === "Disponible");
      setListaMesas(mesasLibres);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/nuevareserva/${selectedMesa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          comensales: selectedComensales,
          idMesa: selectedMesa
        })
      });
      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="contain-reservas-app">
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <nav>
          <Sidebar />
        </nav>
        <div className="content">
          <header>
            <h3 className="titulo">Crear nueva reserva</h3>
            <hr />
          </header>
          <section className="section">
            <main className="main">
              <form className="nueva-reserva" onSubmit={handleSubmit}>
                <div className="form1">
                  <label htmlFor="">Nombre</label>
                  <br />
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  <br />
                  <label htmlFor="">Teléfono</label>
                  <br />
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                  <br />
                  <label htmlFor="">Elegir sala</label>
                  <br />
                  <select
                    name="sala"
                    value={selectedSala}
                    onChange={(e) => {
                      setSelectedSala(e.target.value);
                      obtenerMesasPorSala(e.target.value);
                    }}
                  >
                    <option value="">Seleccionar sala</option>
                    {listaSala.map((sala) => (
                      <option key={sala.idSala} value={sala.idSala}>
                        {sala.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form2">
                  <label htmlFor="">Apellidos</label>
                  <br />
                  <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                  <br />
                  <label htmlFor="">Comensales</label>
                  <br />
                  <select
                    name="comensales"
                    value={selectedComensales}
                    onChange={(e) => setSelectedComensales(e.target.value)}
                  >
                    <option value="">Seleccionar número de comensales</option>
                    <option value="2">Personas 2</option>
                    <option value="3">Personas 3</option>
                    <option value="4">Personas 4</option>
                    <option value="5">Personas 5</option>
                    <option value="6">Personas 6</option>
                    <option value="7">Personas 7</option>
                    <option value="8">Personas 8</option>
                    <option value="9">Personas 9</option>
                    <option value="10">Personas 10</option>
                    <option value="11">Personas 11</option>
                    <option value="12">Personas 12</option>
                  </select>
                  <br />
                  <label htmlFor="">Seleccionar mesa</label>
                  <br />
                  <select 
                   name="sala"
                   value={selectedMesa}
                   onChange={(e) => setSelectedMesa(e.target.value)}
                  >
                    {listaMesas.map((mesa) => (
                      <option key={mesa.idMesa} value={mesa.numeroMesa}>
                        {mesa.numeroMesa}
                      </option>
                    ))}
                  </select>
                  <input type="submit" value="Guardar" />
                </div>
              </form>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Crearreserva;



// import React, { useState } from 'react';
// import { createReserva } from '../reservaQueries'; // Importa la función de creación de reserva

// const Crearreserva = () => {
//     const [nombre, setNombre] = useState('');
//     const [apellido, setApellido] = useState('');
//     const [telefono, setTelefono] = useState('');
//     // Otros estados aquí

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // Llama a la función de creación de reserva con los datos del formulario
//             const idReserva = await createReserva(nombre, apellido, telefono, /* Otros datos */);
//             console.log('Reserva creada con ID:', idReserva);
//             // Resto de la lógica después de crear la reserva
//         } catch (error) {
//             console.error('Error al crear la reserva:', error);
//         }
//     };

//     return (
//         <div>
//             {/* Formulario para crear reserva */}
//         </div>
//     );
// };

// export default Crearreserva;

