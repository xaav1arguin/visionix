import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import "bootstrap-icons/font/bootstrap-icons.css";

const navStyle = {
    color: '#FF7900',
};

const brandStyle = {
    ...navStyle,
    fontSize: '1.5rem',
};

const AppNavbar: React.FC = () => {
    return (
        <Navbar bg="black" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/" style={brandStyle} className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="VisioniX Logo"
                        style={{ width: '90px', marginRight: '50px' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto d-flex align-items-center gap-5">
                        <Nav.Link as={Link} to="/" style={navStyle}>Accueil</Nav.Link>
                        <NavDropdown
                            title={<span style={navStyle}>Catégories</span>}
                            id="categories-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/categorie/28" style={navStyle}>Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/categorie/35" style={navStyle}>Comédie</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/categorie/18" style={navStyle}>Drame</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="" style={navStyle}>Acteurs</Nav.Link>
                        <Nav.Link as={Link} to="" style={navStyle}>À propos</Nav.Link>
                    </Nav>
                    <Form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <FormControl
                            type="search"
                            placeholder="Recherche"
                            className="me-2 bg-dark text-white border-0"
                            aria-label="Search"
                            style={{
                                width: '250px',
                                boxShadow: 'none',      // enlève le glow bleu
                                outline: 'none',        // enlève le contour focus
                            }}
                            onFocus={(e) => e.target.style.borderBottom = '2px solid #FF7900'}
                            onBlur={(e) => e.target.style.borderBottom = 'none'}
                        />
                        <Button variant="link" type="submit" className="p-0">
                            <i className="bi bi-search" style={navStyle}></i>
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
