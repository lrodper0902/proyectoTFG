import React from 'react';
import Sidebar from './Sidebar';

const Crearreserva = () => {
  return (
    <div className='contain-reservas-app'>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
        <nav>
          <Sidebar />          
        </nav>
        <div className='content'>

        </div>
      </div>
    </div>
  )
}

export default Crearreserva;