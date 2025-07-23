import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const navStyle = {
  color: '#FF7900',
};

const brandStyle = {
  ...navStyle,
  fontSize: '1.5rem',
};

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} style={brandStyle} to="/">VisioniX</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/recherche">Recherche</Nav.Link>
            <NavDropdown title="Films (tests)" id="films-dropdown">
              <NavDropdown.Item as={Link} to="/film/680">Pulp Fiction</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Acteurs (tests)" id="acteurs-dropdown">
              <NavDropdown.Item as={Link} to="/acteur/10">Acteur 10</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/acteur/20">Acteur 20</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/acteur/30">Acteur 30</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Catégories (tests)" id="categories-dropdown">
              <NavDropdown.Item as={Link} to="/categorie/28">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categorie/35">Comédie</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categorie/18">Drame</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">À propos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
