import { Global } from '../../helpers/Global';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy, faCheck, faXmark, faMagnifyingGlass, faAngleLeft, faAngleRight, faBan, faUser } from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const url = Global.url + 'todosclientes';
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error("Error al conectar a la base de datos");
      }
      const data = await response.json();
      const formattedData = data.map(cliente => ({ ...cliente, localBaneado: cliente.baneado }));
      setClientes(formattedData);
      setClientesFiltrados(formattedData);
    } catch (error) {
      console.error("No se ha obtenido la lista de usuarios", error);
    }
  };

  const openModal = (cliente) => {
    setSelectedCliente(cliente);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCliente(null);
  };

  const handleChange = (e) => {
    const buscar = e.target.value.toLowerCase();
    const filtrados = clientes.filter(b =>
      b.nombre.toLowerCase().includes(buscar) ||
      b.apellido.toLowerCase().includes(buscar) ||
      b.telefono.includes(buscar)
    );
    setClientesFiltrados(filtrados);
  };

  const handleToggleBaneado = async(cliente) => {
    console.log(cliente)

    try {
      const url = `${Global.url}actualizarcliente/${cliente.idCliente}`;
      const data = { ...cliente, 
                  baneado: cliente.banear };

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response)

      if (!response.ok){
        throw new Error('Error al actualizar el cliente');
      }       
      alert("Usuario actualizado");
      closeModal();
      obtenerUsuarios(); // Refetch the users to reflect the changes
    } catch (error) {
      console.error('Error al actualizar el cliente', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const baneadeo = (baneado) => {
    return baneado ? <p>Baneado</p> : <p>No baneado</p>

  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientesFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='contain-clientes-app'>
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
          <nav>
            <Sidebar />
          </nav>
          <div className='content'>
            <header className='header'>
              <h3 className='titulo'>Lista de usuarios</h3>
              <hr />
            </header>
            <section className='buscar-usuarios'>
              <div className='buscador'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <label>Buscar cliente:</label>
                <input type="search" name="buscar" id="buscar" onChange={handleChange} />                
              </div>

              {clientesFiltrados.length > 8 && (
                <div className="paginacion">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= clientesFiltrados.length}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              )}
            </section>
            <section className='section'>
              {currentItems.length > 0 ? (
                <>
                <table className='tamaño-grande'>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Tel.</th>
                      <th>Registrado</th>
                      <th>Banear</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(cliente => (
                      <tr key={cliente.idCliente}>
                        <td onClick={() => openModal(cliente)}>{cliente.nombre}</td>
                        <td onClick={() => openModal(cliente)}>{cliente.apellido}</td>
                        <td onClick={() => openModal(cliente)}>{cliente.telefono}</td>
                        <td onClick={() => openModal(cliente)}>{cliente.login ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}</td>
                        <td>
                          <button
                            className='boton-banner'
                            onClick={() => handleToggleBaneado(cliente)}
                            style={{ backgroundColor: cliente.banear ? '#242424' : '#a43737', color: 'white' }}
                          >
                            {cliente.banear === 1 ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faUser} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> 
              {/* Movil   */}
              <div className='movil'>
                  <table className="movil-consultas">
                      <tbody>
                        {currentItems.map(cliente => (
                        <tr key={cliente.idCliente}>
                          <td onClick={() => openModal(cliente)}>{cliente.nombre}</td>
                          <td onClick={() => openModal(cliente)}>{cliente.apellido}</td>
                          <td onClick={() => openModal(cliente)}>{cliente.telefono}</td>
                          <td onClick={() => openModal(cliente)}>{cliente.login ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}</td>
                          <td>
                            <button
                              className='boton-banner'
                              onClick={() => handleToggleBaneado(cliente)}
                              style={{ backgroundColor: cliente.localBaneado ? '#242424' : '#a43737', color: 'white' }}
                            >
                              {cliente.localBaneado ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faUser} />}
                            </button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
              </div>          
                </>
              ) : (
                <div className="no-datos">
                  <h3>No hay datos para mostrar</h3>
                  <FontAwesomeIcon icon={faFaceDizzy} />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
   
      <div className={modalIsOpen ? 'modal open' : 'modal'}>
        {selectedCliente && (
          <div className="modal-content">
            <div className="close-div">
              <span className="close" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></span>
            </div>
           <h4>{selectedCliente.nombre} {selectedCliente.apellido}</h4>
              <label htmlFor="telefono"><strong> Teléfono:</strong></label><br />
              <p>{selectedCliente.telefono}</p>

              <label htmlFor="email"><strong> Email:</strong></label><br />
              <p>{selectedCliente.email}</p>

              <label htmlFor="horaRegistro"><strong>Hora de registro:</strong></label><br />
              <p>{selectedCliente.horaRegistro}</p>  

              <label htmlFor="horaRegistro"><strong>Hora de registro:</strong></label><br />
              <p>{selectedCliente.horaRegistro}</p>  

              <label htmlFor="horaRegistro"><strong>Banear usuario: </strong></label>
              <p>{baneadeo(selectedCliente.banear)}</p>
          </div>
        )}
      </div>
    </>
  )
}


export default Usuarios;
