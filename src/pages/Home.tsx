import React from 'react';
import { Container } from 'react-bootstrap';
import HeroBanner from '../components/HeroBanner';
import MovieList from '../components/MovieList';

const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <HeroBanner />
      <Container className="py-5" style={{ minWidth: '100%' }}>
        <MovieList title="Films populaires" category="popular" />
        <MovieList title="Top du moment" category="top_rated" />
        <MovieList title="Nouveautés" category="now_playing" />
      </Container>
    </div>
  );
};

export default Home;
