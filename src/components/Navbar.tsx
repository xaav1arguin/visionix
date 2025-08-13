import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.svg';

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="black" variant="black" expand="md" className="py-1">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="VisioniX Logo"
            height="70"
            className="d-inline-block align-middle me-2"
          />
        </Navbar.Brand>
        <Nav className="mx-auto d-flex flex-row gap-5">
          <Nav.Link as={Link} to="/" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Accueil</Nav.Link>
          <Nav.Link as={Link} to="/recherche" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Recherche</Nav.Link>
          <Nav.Link as={Link} to="/categorie" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Catégories</Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>À propos</Nav.Link>
          <Nav.Link as={Link} to="/acteur/117642" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>Acteur (test)</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
