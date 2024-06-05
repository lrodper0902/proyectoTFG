import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Global } from '../../helpers/Global';

const Crearreserva = () => {
  const [salas, setSalas] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedMesa, setSelectedMesa] = useState('');
  const [selectedComensales, setSelectedComensales] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [tiempo, setTiempo] =useState('');

  useEffect(() => {
    obtenerListaSalas();
  }, []);

  const obtenerListaSalas = async () => {
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

  const handleComensales = (e) => {
    setSelectedComensales(e.target.value);
  }

  const handleSalaChange = (e) => {

    const salaId = e.target.value;
    setSelectedSala(salaId);
    obtenerMesasPorSala(salaId);
  };
  
  const obtenerMesasPorSala = async (salaId) => {
    console.log(salaId)
    try {
      const response = await fetch(Global.url + `mesaporsala/${salaId}`);
      
      if (!response.ok) {
        throw new Error('La solicitud falló con estado ' + response.status);
      }
      const data = await response.json();
      const mesasDisponibles = data.filter(p => p.estado === "Disponible");
      setMesas(mesasDisponibles);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleMesaChange = (e) => {
    setSelectedMesa(e.target.value);
  }

  const handleChangeHora = (e) => {
    console.log(e.target.value)    
    setSelectedHora(e.target.value)
    if(e.target.value === '14:00:00'){
      setTiempo("Mediodia")
    }else{
      setTiempo("Noche");
    }
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Crea un objeto con los datos de la reserva
    const target = e.target;
    const reservaData = {
      fecha:target.fecha.value,
      hora:selectedHora,
      nombre:target.name.value,
      apellido:target.apellidos.value,
      telefono:target.tel.value,
      comensales:selectedComensales,
      tiempo:tiempo,
      mesaId: selectedMesa, //id de la mesa
    };
    console.log(reservaData)
  
    // Envía los datos al backend para crear la reserva
    try {
      const response = await fetch(Global.url + 'reservaspuntual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });
      console.log(response)
  
      if (!response.ok) {
        throw new Error('La solicitud falló con estado ' + response.status);
      }
      console.log(response)
  
      console.log('Reserva creada correctamente');
      alert("SE ha creado la reseerva")
      // Aquí podrías mostrar un mensaje de éxito o redireccionar a otra página
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
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
                  <input type="text" name="name" id="" />
                  <br />
                  <label htmlFor="">Teléfono</label>
                  <br />
                  <input type="tel" name="tel" id="" />
                  <br />
                  <label htmlFor="">Elegir sala</label>
                  <br />
                  <select name="sala" id="" onChange={handleSalaChange} value={selectedSala}>
                    {salas.map((sala, index) => (
                      <option key={index} value={sala.idSala}>
                        {sala.nombre}
                      </option>
                    ))}
                  </select>
                  <br />
                  <label htmlFor="">Seleccione hora</label><br />
                  <select name="hora" id="" onChange={handleChangeHora}>
                    <option value="14:00:00">14:00</option>
                    <option value="20:00:00">20:00</option>
                  </select>

                </div>

                <div className="form2">
                  <label htmlFor="">Apellidos</label>
                  <br />
                  <input type="text" name="apellidos" id="" />
                  <br />
                  <label htmlFor="">Comensales</label>
                  <br />
                  <select name="comensales" id="" onChange={handleComensales}>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6 personas</option>
                    <option value="7">7 personas</option>
                    <option value="8">8 personas</option>
                    <option value="9">9 personas</option>
                    <option value="10">10 personas</option>
                    <option value="11">11 personas</option>
                    <option value="12">12 personas</option>
                  </select>
                  <br />
                  <label htmlFor="">Seleccionar mesa</label>
                  <br />
                  <select name="mesa" id="" value={selectedSala} onChange={handleMesaChange}>
                    {mesas.length === 0 ? (
                      <option value="">Completo</option>
                    ) : (
                      mesas.map((mesa, index) => (
                        <option key={index} value={mesa.idMesa}>
                          {mesa.numeroMesa}
                        </option>
                      ))
                    )}
                  </select>
                  <label htmlFor="">Seleccione dia</label><br />
                  <input type="date" name="fecha" id="" />
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
