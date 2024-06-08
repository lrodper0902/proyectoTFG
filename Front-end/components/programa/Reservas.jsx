import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Global } from '../../helpers/Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [tituloFecha, setTituloFecha] = useState('');

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];  
        obtenerRegistros(fechaActual);
        setTituloFecha(fechaActual);
    }, []);

    const obtenerRegistros = async () => {
        try {
            const url = `${Global.url}/listareservas`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error("No se ha obtenido respuesta de la API");
            }
            let datos = await response.json();
            console.log(datos);
            return datos;
        } catch (error) {
            console.error("Error al obtener los registros", error);
        }
    };
    
    const obtenerNombreCliente = async (cliente_id) => {
        const response = await fetch(`${Global.url}/clienteporid/${cliente_id}`);
        const data = await response.json();
        return data.nombre;
    };
    
    const obtenerNombreSala = async (sala_id) => {
        const response = await fetch(`${Global.url}/obtenersala/${sala_id}`);
        const data = await response.json();
        return data.nombre;
    };
    
    const porFecha = async (fechaBuscada) => {
        try {
            const reservas = await obtenerRegistros(); // Asegurarse de que esta promesa se resuelva.
            const fechaFormateada = moment(fechaBuscada).format('YYYY-MM-DD');
    
            const reservasConDatos = await Promise.all(
                reservas.filter(reserva => moment(reserva.fecha).format('YYYY-MM-DD') === fechaFormateada)
                .map(async reserva => ({
                    ...reserva,
                    nombreCliente: await obtenerNombreCliente(reserva.cliente_id),
                    nombreSala: await obtenerNombreSala(reserva.sala_id)
                }))
            );
    
            setReservas(reservasConDatos);
        } catch (error) {
            console.error("Error al procesar las reservas por fecha", error);
        }
    };
    

    const mostrarRegistrosPorTiempo = async (tipoTiempo, fecha) => {
        try {
            const url = `${Global.url}/listareservas`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error("No se ha conectado a la API");
            }
            const datos = await response.json();
            
            let reservasFiltradas;
            if (tipoTiempo === "todos") {
                reservasFiltradas = datos.filter(reserva => moment(reserva.fecha).isSame(fecha, 'day'));
            } else {
                reservasFiltradas = datos.filter(reserva => reserva.tiempo === tipoTiempo && moment(reserva.fecha).isSame(fecha, 'day'));
            }
            
            // const reservasConNombres = await Promise.all(reservasFiltradas.map(reserva => agregarNombreAReserva(reserva)));
            setReservas(reservasFiltradas);
        } catch (error) {
            console.error("Error al filtrar los registros por tiempo", error.message);
        }
    }


    const eliminarReserva = async(id) => {
        try {
            const url = `${Global.url}/eliminarreservas/${id}`;
            const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta reserva?');

            if(confirmacion){
                const response = await fetch(url, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error("No se ha obtenido respuesta de la API clientes");
                }
                alert("Reserva eliminada correctamente")
                
            }
            handleSubmit(); //No funcinoa :(
        } catch (error) {
            console.error("Error al obtener el nombre del cliente", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fechaSeleccionada = e.target.date.value;
        if (!fechaSeleccionada) {
            alert("Seleccione una fecha");
            return;
        }
        setTituloFecha(fechaSeleccionada);
        porFecha(fechaSeleccionada);
    }

    const devolverFecha = (formatofecha) => {
        return moment(formatofecha).format('YYYY-MM-DD');         
    }
  
    const devolverHora = (formatoHora) => {
        const partes = formatoHora.split(':');
        return partes[0] + ':' + partes[1];
    }

    return (
        <div className='contain-reservas-app'>
            <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
                <nav>
                    <Sidebar />          
                </nav>

                <div className="content">
                    <header className='header'>
                        <h3 className='titulo'>Reservas</h3>
                        <hr />
                    </header>

                    <section className='section-reservas'>
                        <article className='article-fecha'>
                            <form onSubmit={handleSubmit} className='fecha'>
                                <label>Fecha</label>
                                <input type="date" name="date" id="date" />
                                <button type="submit" className="button" aria-label="Buscar">
                                    <i className='fas fa-search'></i>
                                </button>
                            </form>
                            <form className='comida-cena'>
                                <label htmlFor="comida-cena">Seleccionar:&nbsp;</label> 
                                <select name="comida-cena" id="comida-cena" onChange={(e) => mostrarRegistrosPorTiempo(e.target.value, tituloFecha)}>
                                    <option value="todos">Todos</option>
                                    <option value="Mediodia">Comida</option>
                                    <option value="Noche">Cena</option>
                                </select>
                            </form>
                            <div className='boton-lista-reservas'>
                                <button onClick={obtenerRegistros}>Todas las reservas</button>
                            </div>
                        </article>

                        <main className='registros-reservas'>
                            <h3>{tituloFecha}</h3>
                            {reservas.length > 0 ? (
                              <>
                                 <table className='tamaño-grande'>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Anticipo</th>
                                            <th>Comensales</th>
                                            <th>Sala</th>
                                            <th>Mesa</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservas.map(reserva => (
                                            <tr key={reserva.cliente_id}>
                                                <td>{reserva.nombreCliente}</td>
                                                <td>{devolverFecha(reserva.fecha)}</td>
                                                <td>{devolverHora(reserva.hora)}h</td>
                                                <td>{reserva.precioPagado}€</td>
                                                <td>{reserva.comensales}</td>
                                                <td>{reserva.nombreSala}</td>
                                                <td>{reserva.mesa_id}</td>
                                                <td><button className='btn-eliminar' onClick={() => eliminarReserva(reserva.idReserva)}>
                                                        <FontAwesomeIcon  icon={faTrash}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Tamaño para movil */}
                                <div className='movil'>
                                  <table className="movil-consultas">
                                      <tbody>
                                          {reservas.map(reserva => (
                                              <tr key={reserva.cliente_id}>
                                                  <td><strong>{reserva.nombre}</strong></td>
                                                  <td>{devolverHora(reserva.hora)}h</td>
                                                  <td>{reserva.precioPagado}€</td>
                                                  <td>{reserva.comensales} pers.</td>
                                                  <td>Mesa: {reserva.mesa_id}</td>
                                                  <td><button onClick={() => eliminarReserva(reserva.idReserva)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                  </td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              </div>
                              </>
                               
                            ) : (
                                <div className='no-datos'>
                                    <h3>No hay reservas registradas</h3>
                                    <FontAwesomeIcon icon={faFaceDizzy} />
                                </div>
                            )}
                        </main>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Reservas;
