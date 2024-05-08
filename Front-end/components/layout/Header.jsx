import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='header'>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <h1>L</h1>
        </div>
        <div className='icon-responsive' onClick={toggleMenu}>
          <p>-</p>
        </div>        
        <ul className='menu'>
          <li><NavLink to="/inicio">Inicio</NavLink></li>
          <li><NavLink to="/carta">Carta</NavLink></li>
          <li><NavLink to="/vinos">Vinos</NavLink></li>
          <li><NavLink to="/catering">Catering</NavLink></li>
          <li><NavLink to="/reservas">Reservas</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

