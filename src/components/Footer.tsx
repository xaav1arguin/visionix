import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: '#ff7900', padding: '20px 0' }}>
      <Container className="text-center">
        <p style={{ margin: 0, fontFamily: 'Bebas Neue, sans-serif' }}>
          &copy; {new Date().getFullYear()} VisioniX — Tous droits réservés
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
