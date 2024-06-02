import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary menu " fixed='top'>
      <Container>
        <Navbar.Brand className='nav-menu' as={Link} to="/">
          <img className='logo' src='/7monjas/7monjas.png'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          {/* <i className="fa fa-bars"></i> Ícono de Font Awesome */}
          {/* <FontAwesomeIcon icon={faBars} /> */}
      </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} className='menu-option' to="/inicio">Inicio</Nav.Link>
            <Nav.Link as={Link} className='menu-option' to="/carta">Carta</Nav.Link>
            <Nav.Link as={Link} className='menu-option' to="/vinos">Vinos</Nav.Link>
            <Nav.Link as={Link} className='menu-option' to="/catering">Catering</Nav.Link>
            <Nav.Link as={Link} className='menu-option' to="/reservas">Reservas</Nav.Link>
            <Nav.Link as={Link} className='menu-option' to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
