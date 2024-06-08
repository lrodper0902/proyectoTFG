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
  const [capacidadDisponible, setCapacidadDisponible] = useState(null);

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

  const verificarCapacidad = async () => {
    if (!selectedSala || !fecha || !hora) return;

    const url = `/api/disponibilidad?salaId=${selectedSala}&fecha=${fecha}&hora=${hora}`;
    const response = await fetch(url);
    if(response.ok){
        const { capacidad_disponible } = await response.json();
        setCapacidadDisponible(capacidad_disponible);
    } else {
        console.error("Error al verificar la disponibilidad");
        setCapacidadDisponible(null); // En caso de error, resetea la capacidad disponible
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(comensales > capacidadDisponible){
      alert("No hay espacio suficiente");
      return;
    }


    // Crea un objeto con los datos de la reserva
    const target = e.target;
    const reservaData = {
      nombre:target.name.value,
      apellido:target.apellidos.value,
      telefono:target.tel.value,
      fecha:target.fecha.value,
      hora:selectedHora,
      comensales:selectedComensales,
      tiempo:tiempo,

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
      alert("Se ha creado la reserva")


      //Actualizamos los valores
      target.fecha.value = '';
      setSelectedComensales('');
      setSelectedHora('');
      target.name.value = '';
      target.apellidos.value = '';
      target.tel.value = '';
      setTiempo('');
      setSelectedMesa('');
      setSelectedSala('')

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
                  <input type="text" required name="name" id="" />
                  <br />
                  <label htmlFor="" required>Teléfono</label>
                  <br />
                  <input type="tel" name="tel" id="" required />
                  <br />
                  <label htmlFor="">Elegir sala</label>
                  <br />
                  <select required name="sala" id="" onChange={handleSalaChange} value={selectedSala}>
                    <option defaultChecked>Seleccionar salon</option>
                    {salas.map((sala, index) => (
                      <>
                        <option key={index} value={sala.idSala}>
                          {sala.nombre}
                        </option>
                      </>
                    ))}
                  </select>
                  <br />
                  <label htmlFor="">Seleccione hora</label><br />
                  <select required name="hora" id="" onChange={handleChangeHora}>
                    <option value=''>Seleccionar hora</option>
                    <option value="14:00:00">14:00</option>
                    <option value="20:00:00">20:00</option>
                  </select>

                </div>

                <div className="form2">
                  <label htmlFor="">Apellidos</label>
                  <br />
                  <input required type="text" name="apellidos" id="" />
                  <br />
                  <label htmlFor="">Comensales</label>
                  <br />
                  <select required name="comensales" id="" onChange={handleComensales}>
                    <option value="" defaultChecked>Selecciona nº comensales</option>
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
                  {/* <label htmlFor="">Seleccionar mesa</label>
                  <br />
                  <select required name="mesa" id="" value={selectedSala} onChange={handleMesaChange}>
                    <option >Seleccionar mesa</option>
                    {mesas.length === 0 ? (
                      <option value="">Completo</option>
                    ) : (
                      mesas.map((mesa, index) => (
                        <option key={index} value={mesa.idMesa}>
                          {mesa.numeroMesa}
                        </option>
                      ))
                    )}
                  </select> */}
                  <label htmlFor="">Seleccione dia</label><br />
                  <input required type="date" name="fecha" id="" /><br /><br /><br /><br />

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
