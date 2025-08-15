import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
};

const HeroBanner: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=34711b1563106ce68d5381f00d0d8ce1&language=fr-FR'
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <section
      style={{
        position: 'relative',
        height: '90vh',
        overflow: 'hidden',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85))', zIndex: 1, }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '60px', }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '4rem', marginBottom: '20px' }}>
          {currentMovie.title}
        </h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '30px', lineHeight: '1.5' }}>
          {currentMovie.overview.length > 300
            ? currentMovie.overview.slice(0, 300) + '...'
            : currentMovie.overview}
        </p>
        <Link
          to={`/film/${currentMovie.id}`}
          style={{
            backgroundColor: '#ff7900',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1rem',
            display: 'inline-block',
          }}
        >
          Voir le film
        </Link>
      </div>

      {/* Responsive mobile */}
      <style>{`
        @media (max-width: 768px) {
          section {
            text-align: center;
            padding: 30px 20px;
          }
          h1 {
            font-size: 2.5rem !important;
          }
          p {
            font-size: 1rem !important;
          }
          a {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
