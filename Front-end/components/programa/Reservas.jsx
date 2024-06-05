import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Global } from '../../helpers/Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy, faTrash } from '@fortawesome/free-solid-svg-icons';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [tituloFecha, setTituloFecha] = useState('');

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];  
        obtenerRegistros(fechaActual);
        setTituloFecha(fechaActual);
    }, []);

    const obtenerRegistros = async (fechaBuscada) => {
        try {
            const url = `${Global.url}/listareservas`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error("No se ha obtenido respuesta de la API");
            }
            let datos = await response.json();
            datos = datos.filter(reserva => reserva.fecha && reserva.fecha.split('T')[0] === fechaBuscada);
            const reservasConNombres = await Promise.all(datos.map(reserva => agregarNombreAReserva(reserva)));
            setReservas(reservasConNombres);
        } catch (error) {
            console.error("Error al obtener los registros por fecha", error);
        }
    }

    const agregarNombreAReserva = async (reserva) => {
        try {
            return { ...reserva, nombre: await obtenerNombreCliente(reserva.cliente_id) };
        } catch (error) {
            console.error("Error al obtener el nombre del cliente:", error);
            return { ...reserva, nombre: 'Desconocido' };
        }
    }

    const mostrarRegistrosPorTiempo = async (tipoTiempo, fecha) => {
      try {
        console.log(tipoTiempo)
          const url = `${Global.url}/listareservas`;
          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
              throw new Error("No se ha conectado a la API");
          }
          const datos = await response.json();
          if(tipoTiempo === "todos"){
            const todosReguistros = datos.filter(reserva => devolverFecha(reserva.fecha) === fecha);
            const reservasConNombres = await Promise.all(todosReguistros.map(reserva => agregarNombreAReserva(reserva)));

            return setReservas(reservasConNombres);
          }

          const reservasFiltradas = datos.filter(reserva => reserva.tiempo === tipoTiempo && devolverFecha(reserva.fecha) === fecha);
          const reservasConNombres = await Promise.all(reservasFiltradas.map(reserva => agregarNombreAReserva(reserva)));
          setReservas(reservasConNombres);
      } catch (error) {
          console.error("Error al filtrar los registros por tiempo", error.message);
      }
  }  

    const obtenerNombreCliente = async (id) => {
        try {
            const url = `${Global.url}/clienteporid/${id}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error("No se ha obtenido respuesta de la API clientes");
            }
            const cliente = await response.json();
            return cliente[0].nombre;
        } catch (error) {
            console.error("Error al obtener el nombre del cliente", error);
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
        obtenerRegistros(fechaSeleccionada);
    }

    const devolverFecha = (formatofecha) => {
        return formatofecha.split('T')[0];   //0000-00-00
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

                    <section className='section'>
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
                                    <option value="Mediod├¡a">Comida</option>
                                    <option value="Noche">Cena</option>
                                </select>
                            </form>
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
                                            <th>Mesa</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservas.map(reserva => (
                                            <tr key={reserva.cliente_id}>
                                                <td>{reserva.nombre}</td>
                                                <td>{devolverFecha(reserva.fecha)}</td>
                                                <td>{devolverHora(reserva.hora)}h</td>
                                                <td>{reserva.precioPagado}€</td>
                                                <td>{reserva.comensales}</td>
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
