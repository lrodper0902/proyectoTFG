import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Global } from '../../helpers/Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy, faTrash, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [tituloFecha, setTituloFecha] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [tiempo, setTiempo] = useState(['Todos','Mediodia', 'Noche']);
    const [salas, setSalas] = useState([]);
    const [salaSeleccionada, setSalaSeleccionada] = useState('');

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];
        console.log(fechaActual)
        obtenerFechaActual(fechaActual);
        setTituloFecha(fechaActual);
        obtenerSalas();
    }, []);

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

    const obtenerRegistros = async () => {
        try {
            const url = `${Global.url}/listareservas`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error("No se ha obtenido respuesta de la API");
            }
            let datos = await response.json();

            return datos;
        } catch (error) {
            console.error("Error al obtener los registros", error);
        }
    };

    const obtenerFechaActual = async(fecha) => {
        const fechaFormateada = moment(fecha).format('YYYY-MM-DD');
        const listaRegistros = await obtenerRegistros();
        console.log(listaRegistros)

        const lista = await Promise.all(
            listaRegistros.filter(f => {
                console.log(moment(f.fecha).format('YYYY-MM-DD'))
                return moment(f.fecha).format('YYYY-MM-DD') === fechaFormateada                
            }).map(async registros => ({
                ...registros,
                nombreCliente: await obtenerNombreCliente(registros.cliente_id),
                nombreSala: await obtenerNombreSala(registros.sala_id)
            }) )
        ) 
        console.log(lista)
        setReservas(lista);
    }

    const todosRegistros = async() => {
        const listaRegistros = await obtenerRegistros();
        console.log(listaRegistros)
        const lista = await Promise.all(
            listaRegistros.map(async reserva => ({
                ...reserva,
                nombreCliente: await obtenerNombreCliente(reserva.cliente_id),
                nombreSala: await obtenerNombreSala(reserva.sala_id)
            }))
        );
        setTiempo(['Todas']);
        setReservas(lista);
        setTituloFecha('Todas las fechas');
    }

    const obtenerNombreCliente = async (cliente_id) => {
        const response = await fetch(`${Global.url}/clienteporid/${cliente_id}`);
        const data = await response.json();

        return data[0].nombre;
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
            setTiempo(['Todos','Mediodia', 'Noche']);
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
            console.log(fecha)

            let reservasFiltradas;
            if (tipoTiempo === "Todos") {
                reservasFiltradas = datos.filter(reserva => moment(reserva.fecha).isSame(fecha, 'day'));
            } else {
                reservasFiltradas = datos.filter(reserva => reserva.tiempo === tipoTiempo && moment(reserva.fecha).isSame(fecha, 'day'));
            }

            const lista = await Promise.all(
                reservasFiltradas.map(async reserva => ({
                    ...reserva,
                    nombreCliente: await obtenerNombreCliente(reserva.cliente_id),
                    nombreSala: await obtenerNombreSala(reserva.sala_id)
                }))
            );            
            setReservas(lista);
            setTituloFecha(fecha);

        } catch (error) {
            console.error("Error al filtrar los registros por tiempo", error.message);
        }
    }

    const filtrarPorSala = async (salaId) => {
        try {
            const listaRegistros = await obtenerRegistros();
            let listaFiltrada = listaRegistros;
            if (salaId !== 'todas') {
                listaFiltrada = listaRegistros.filter(reserva => reserva.sala_id == salaId);
            }

            const lista = await Promise.all(
                listaFiltrada.map(async reserva => ({
                    ...reserva,
                    nombreCliente: await obtenerNombreCliente(reserva.cliente_id),
                    nombreSala: await obtenerNombreSala(reserva.sala_id)
                }))
            );
            setReservas(lista);
            setSalaSeleccionada(salaId);
        } catch (error) {
            console.error("Error al filtrar las reservas por sala", error.message);
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
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const devolverHora = (formatoHora) => {
        const partes = formatoHora.split(':');
        return partes[0] + ':' + partes[1];
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reservas.slice(indexOfFirstItem, indexOfLastItem);

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
                                    {tiempo.map(t => (
                                        <option value={t} key={t}>{t}</option>
                                    ))}
                                </select>
                            </form>
                            <form className='filtro-sala'>
                                <label htmlFor="filtro-sala">Filtrar por Sala:&nbsp;</label>
                                <select name="filtro-sala" id="filtro-sala" onChange={(e) => filtrarPorSala(e.target.value)}>
                                    <option value="todas">Todas las salas</option>
                                    {salas.map(sala => (
                                        <option key={sala.idSala} value={sala.idSala}>{sala.nombre}</option>
                                    ))}
                                </select>
                            </form>
                            <div className='boton-lista-reservas'>
                                <button onClick={todosRegistros}>Todas las reservas</button>
                            </div>
                            {reservas.length > 8 && (
                            <div className="paginacion">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= reservas.length}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </div>
                            )}
                        </article>

                        <main className='registros-reservas'>
                            <h3>{tituloFecha}</h3>
                            {currentItems.length > 0 ? (
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
                                        {currentItems.map(reserva => (
                                            <tr key={reserva.idReserva}>
                                                <td>{reserva.nombreCliente}</td>
                                                <td>{devolverFecha(reserva.fecha)}</td>
                                                <td>{devolverHora(reserva.hora)}h</td>
                                                <td>{reserva.precioPagado < 0 ? <p>0</p> : reserva.precioPagado}€</td>
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
                                              <tr key={reserva.idReserva}>
                                                  <td><strong>{reserva.nombreCliente}</strong></td>
                                                  <td>{devolverFecha(reserva.fecha)}</td>
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
