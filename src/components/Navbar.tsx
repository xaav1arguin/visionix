import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.svg';

const AppNavbar: React.FC = () => {
  return (
    <Navbar expand="md" variant="dark" style={{ borderBottom: '2px solid #ff7900' }} className="bg-black py-3" collapseOnSelect>
      <Container fluid>
        {/* Logo complètement à gauche */}
        <Navbar.Brand as={Link} to="/" className="ms-3">
          <img
            src={logo}
            alt="VisioniX Logo"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Burger button */}
        <Navbar.Toggle aria-controls="navbar-nav" className="me-3" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/" style={styles.link}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={styles.link}>
              À propos
            </Nav.Link>
            <Nav.Link as={Link} to="/recherche" style={styles.link}>
              Recherche
            </Nav.Link>
            <Nav.Link as={Link} to="/categorie" style={styles.link}>
              Catégories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const styles = {
  link: {
    color: '#ff7900',
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '1.6rem',
    padding: '0.5rem 1rem',
  },
};

export default AppNavbar;