import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { useAuth } from '../../hooks/useAuth'; 

export const Header = () => {
  // // const { auth, setAuth } = useAuth(); 
  // const navigate = useNavigate();

  // const handleLogout = (event) => {
  //   event.preventDefault(); 
  //   // console.log(auth);
  //   // localStorage.removeItem("token");
  //   // localStorage.removeItem("user");
  //   // setAuth({});
  //   // navigate('/login');
  // };

  return (
    <Navbar expand="lg" className="bg-body-tertiary menu" fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to="/" className='nav-menu'>
          <img className='logo' src='/7monjas/7monjas.png' alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/inicio">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/carta">Carta</Nav.Link>
            <Nav.Link as={Link} to="/vinos">Vinos</Nav.Link>
            <Nav.Link as={Link} to="/catering">Catering</Nav.Link>
            <Nav.Link as={Link} to="/reservas">Reservas</Nav.Link>
            {/* {auth.user ? ( */}
              {/* <>
                <Nav.Link as={Link} to="/app/reservas">Mi Cuenta</Nav.Link>
                <button onClick={handleLogout} className="btn btn-link nav-link" style={{ color: '#fff' }}>Cerrar Sesión</button>
              </> */}
            {/* ) : ( */}
              <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            {/* )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
