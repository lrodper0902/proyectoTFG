import { Global } from '../../helpers/Global';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy, faCheck, faXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() =>{
    obtenerUsuarios();
  },[]);

  const obtenerUsuarios = async () => {
    try {
      const url = Global.url + 'todosclientes';
      const response = await fetch(url, {method: 'GET'});
      if (!response.ok) {
        throw new Error("Error al conectar a la base de datos");
      }
      const data = await response.json();
      setClientes(data);
      setClientesFiltrados(data);  // Corregido para setear correctamente los clientes filtrados
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

    if (!buscar.trim()) {
      setClientesFiltrados(clientes);
    } else {
      const filtrados = clientes.filter(b =>
        b.nombre.toLowerCase().includes(buscar) || b.apellido.toLowerCase().includes(buscar)
      );
      setClientesFiltrados(filtrados);
    }
  };

  const handleUpdate  = () =>{

  }

  const handleInputChange = () =>{
    
  }


  const registrado = (login) =>{
    if(login === 1){
      return <FontAwesomeIcon icon={faCheck} />;
    }else{
      return <FontAwesomeIcon icon={faXmark} />
    }

  }

  return (
    <>
      <div className='contain-clientes-app'>
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
          <nav>
            <Sidebar />
          </nav>
          <div className='content'>
            <header className='header'>
              <h3 className='titulo'>Lista de usuarios</h3>
              <hr />
            </header>
            <section className='buscar-usuarios'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <label>Buscar cliente:</label>
                <input type="search" name="buscar" id="buscar" onChange={handleChange}/>
                {/* <button type="submit" className="button" aria-label="Buscar">
                    <i className='fas fa-search'></i>
                </button> */}
            </section>
            <section className='section'>
              {clientesFiltrados.length > 0 ? (
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
                      {clientesFiltrados.map(cliente => 
                        <tr className='cursor'  onClick={() => openModal(cliente)} key={cliente.idCliente}>
                          <td>{cliente.nombre}</td>
                          <td>{cliente.apellido}</td>
                          <td>{cliente.telefono}</td>
                          <td>{registrado(cliente.login)}</td>
                          <td>{cliente.login}</td>
                        </tr>                      
                      )}
                  </tbody>
                  </table>
                  {/* Tamaño para movil */}
                  <div className='movil'>
                  <table className="movil-consultas">
                      <tbody>
                          {clientes.map(cliente => (
                              <tr className='cursor' onClick={() => openModal(cliente)} key={cliente.cliente_id}>
                                <td><strong>{cliente.nombre}</strong></td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.login}</td>
                                <td>{cliente.login}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>          
            </>
              ): (
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
                <form onSubmit={handleUpdate} className="form-editar-cliente">
                    <label htmlFor="telefono"><strong> Teléfono:</strong></label><br />
                    <input type="text" id="telefono" value={selectedCliente.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} /><br />
  
                    <label htmlFor="email"><strong> Email:</strong></label><br />
                    {/* <input type="text" id="email" value= onChange={(e) => handleInputChange('email', e.target.value)} /><br /> */}
                    <p>{selectedCliente.email}</p>
  
                    <label htmlFor="horaRegistro"><strong>Hora de registro:</strong></label><br />
                    <p>{selectedCliente.horaRegistro}</p>  
  
                    <label htmlFor="horaRegistro"><strong>Hora de registro:</strong></label><br />
                    <p>{selectedCliente.horaRegistro}</p>  

                    <label htmlFor="horaRegistro"><strong>Banear usuario</strong></label><br />

                    <button type="submit" className="button-update">Actualizar</button>
                </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Usuarios;