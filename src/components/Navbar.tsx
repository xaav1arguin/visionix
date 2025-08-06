import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.svg'; // ton logo SVG

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="black" variant="black" expand="md" className="py-1">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo + nom à gauche */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="VisioniX Logo"
            height="70"
            className="d-inline-block align-middle me-2"
          />

        </Navbar.Brand>

        {/* Liens centrés */}
        <Nav className="mx-auto d-flex flex-row gap-5">
          <Nav.Link as={Link} to="/" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Accueil</Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>À propos</Nav.Link>
          <Nav.Link as={Link} to="/recherche" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Recherche</Nav.Link>
          <Nav.Link as={Link} to="/" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Catégories</Nav.Link>
        </Nav>

        {/* Loupe à droite avec menu catégories */}
        <Nav>
          <NavDropdown
            title={<i className="bi bi-search" style={{ color: '#ff7900', fontSize: '1.3rem' }}></i>}
            id="categories-dropdown"
            align="end"
          >
            <NavDropdown.Item as={Link} to="/categorie/28">Action</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categorie/35">Comédie</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categorie/18">Drame</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categorie/27">Horreur</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
