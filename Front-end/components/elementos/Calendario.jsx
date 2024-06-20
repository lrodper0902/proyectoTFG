import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Formreservas } from '../pages/Formreservas';

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [comida, setcomida] = useState('Mediodia');
  const horasMediodia = ['13:00', '13:30', '14:00', '14:30', '15:00'];
  const horasNoche = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];
  const [comensales, setComensales] = useState('2');
  const [hora, setHora] = useState(horasMediodia[0]); // Default to first hour
  const [showFormReservas, setShowFormReservas] = useState(false);
  const [selectedSala, setSelectedSala] = useState('');
  const [salas, setSalas] = useState([]);


  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
  
    return [year, month, day].join('-');
  }

  const tileClassName = ({ date, view }) => {

    if (view === 'month') {
      const formattedDate = formatDate(date);


      const day = date.getDay();
      if (day === 5 || day === 6 || day === 0) {

        return 'open';
      }

      return 'closed';
    }
  };
  

    useEffect(() => {
      obtenerSalas();
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFormReservas(true);
  }

  const obtenerSalas = async () => {
    try {
        const response = await fetch(Global.url + 'salas', {method: 'GET'});
        console.log(response)
        if (!response.ok) {
            throw new Error('La solicitud falló con estado ' + response.status);
        }  
        const data = await response.json();

        setSalas(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

  const displayedHours = comida === 'Mediodia' ? horasMediodia : horasNoche;

  if (showFormReservas) {
    return <Formreservas date={date} comensales={comensales} hora={hora} comida={comida} selectedSala={selectedSala} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='calendario'>
        <div className="calendar-container">
          <Calendar
            tileClassName={tileClassName}
            onChange={setDate}
            value={date}
            locale="es-ES"
            className="custom-calendar"
            nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
            prevLabel={<FontAwesomeIcon icon={faAngleLeft} />}
          />
        </div>

        <div className='formulario-fecha'>
          <h3>Reserva ya</h3>
          <div>
            <label htmlFor="">Comensales</label>
            <select required name="num-comensales" onChange={(e) => setComensales(e.target.value)} id="">
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">6</option>
              <option value="">8</option>
              <option value="">10</option>
              <option value="">11</option>
              <option value="">12</option>
            </select>
          </div>

          <div className="selecionar-comida-cena">
            <button type="button" className={`meal-button ${comida === 'lunch' ? 'active' : ''}`} onClick={() => setcomida('lunch')}>Comer</button>
            <button type="button" className={`meal-button ${comida === 'dinner' ? 'active' : ''}`} onClick={() => setcomida('dinner')}>Cenar</button>
          </div>

          <div>
            <label htmlFor="hora">Hora</label>
            <select required name="hora" value={hora} onChange={(e) => setHora(e.target.value)}>
              {displayedHours.map(hora => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </select>              
          </div>

          <div>
            <label htmlFor="">Seleccione sala</label>
            <select value={selectedSala} onChange={e => setSelectedSala(e.target.value)}>
                <option value="">Seleccionar</option>
                {salas.map((sala) => (
                    <option key={sala.idSala} value={sala.idSala}>{sala.nombre}</option>
                ))}
            </select>
          </div>
        </div>

        <input type="submit" value="Reservar" />
      </form>
    </>
  );
};

export default Calendario;
