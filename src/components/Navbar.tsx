import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const AppNavbar: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">VisioniX</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <NavDropdown title="Catégories (tests)" id="categories-dropdown">
                            <NavDropdown.Item as={Link} to="/categorie/28">Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/categorie/35">Comédie</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/categorie/18">Drame</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
