import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import Sidebar from './Sidebar';

function ReservaForm() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [tiempo, setTiempo] = useState('Mediodia'); // 'Mediodia' o 'Noche'
    const [hora, setHora] = useState('');
    const [comensales, setComensales] = useState(1);
    const [salas, setSalas] = useState([]);
    const [selectedSala, setSelectedSala] = useState('');
    const [capacidadDisponible, setCapacidadDisponible] = useState(null);

    const horasMediodia = ['12:00', '13:00', '14:00']; // Ejemplo de horas de mediodía
    const horasNoche = ['19:00', '20:00', '21:00']; // Ejemplo de horas de noche

    useEffect(() => {
        obtenerSalas();
    }, []);

    useEffect(() => {
        verificarCapacidad();
    }, [selectedSala, fecha, hora]);

    const obtenerSalas = async () => {
        try {
            const response = await fetch(Global.url + 'salas');
            if (!response.ok) {
                throw new Error('La solicitud falló con estado ' + response.status);
            }  
            const data = await response.json();
            setSalas(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const verificarCapacidad = async () => {
        if (!selectedSala || !fecha || !hora) return;
        const url = `${Global.url}/disponibilidad?salaId=${selectedSala}&fecha=${fecha}&hora=${hora}`;
        const response = await fetch(url, {method:'GET'});
        console.log(response)
        if(response.ok){
            const data = await response.json();
            console.log(data)
            setCapacidadDisponible(data.capacidad_disponible);
            
          } else {
            console.error("Error al verificar la disponibilidad");
            setCapacidadDisponible(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(comensales)
        console.log(capacidadDisponible)
        if (comensales > capacidadDisponible) {
            alert("No hay suficiente capacidad para la cantidad de comensales.");
            return;
        }

        const reserva = { 
          nombre, 
          apellido, 
          telefono, 
          email, 
          fecha, 
          hora, 
          comensales, 
          salaId: selectedSala, 
          tiempo
        };

        const response = await fetch(Global.url + '/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        });

        if (response.ok) {
            alert('Se ha creado la reserva');
            setNombre('');
            setApellido('');
            setTelefono('');
            setEmail('');
            setSelectedSala('Seleccionar sala');
        } else {
            alert('Error al crear la reserva.');
        }
    };

    const renderHorasSelector = () => {
        const horas = tiempo === 'Mediodia' ? horasMediodia : horasNoche;
        return (
            <select value={hora} onChange={e => setHora(e.target.value)} required>
                <option value="">Seleccionar </option>
                {horas.map(h => (
                    <option key={h} value={h}>{h}</option>
                ))}
            </select>
        );
    };

    return (
        <div className='contain-reservas-app'>
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
              <form onSubmit={handleSubmit}>

                <div className="form1">
                  <label htmlFor="">Nombre</label>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}/>

                  <label htmlFor="" required>Apellido</label>
                  <input type="text" value={apellido} onChange={e => setApellido(e.target.value)}/>

                  <label htmlFor="" required>Teléfono</label>
                  <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)}/>

                  <label htmlFor="" required>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                  
                  <label htmlFor="">Fecha</label><br />
                  <input className='input-fechas' type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                </div>

                <div className="form2">
                  <label htmlFor="">Mediodía/Cena</label><br />
                  <select value={tiempo} onChange={e => setTiempo(e.target.value)}>
                      <option value="Mediodia">Mediodía</option>
                      <option value="Noche">Noche</option>
                  </select>

                  <label htmlFor="">Seleccione sala</label><br />
                  <select value={selectedSala} onChange={e => setSelectedSala(e.target.value)}>
                      <option value="">Seleccionar</option>
                      {salas.map((sala) => (
                          <option key={sala.idSala} value={sala.idSala}>{sala.nombre}</option>
                      ))}
                  </select>

                  <label htmlFor="">Seleccione la hora</label><br />
                  {renderHorasSelector()}

                  <label htmlFor="">Comensales</label>
                  <input type="number" value={comensales} onChange={e => setComensales(parseInt(e.target.value, 10))} min="1" />

                </div>

                <div className='boton-form'>
                  <button className='btn-reserva' type="submit">Crear reserva</button>
                </div>
               </form>
              </main>
            </section>
          </div>
        </div>
      </div>
    );
}

export default ReservaForm;
