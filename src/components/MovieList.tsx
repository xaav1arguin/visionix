import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
};

type Props = {
  title: string;
  category?: string; // optionnel si on fournit movies direct
  movies?: Movie[];
};

const MovieList: React.FC<Props> = ({ title, category, movies: propMovies }) => {
  const [movies, setMovies] = useState<Movie[]>(propMovies || []);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propMovies) return; // ne rien faire si on a déjà la liste

    if (!category) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=fr-FR`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [category, propMovies]);

  // ... reste inchangé


  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 600;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section style={{ marginBottom: '60px' }}>
      {/* Ligne avec le titre et les flèches */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <h2 style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', margin: 0 }}>
          {title}
        </h2>
        <div>
          <button className="arrow-button-inline" onClick={() => scroll('left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="arrow-button-inline" onClick={() => scroll('right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* Carrousel horizontal */}
      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          scrollBehavior: 'smooth',
          padding: '8px 0',
        }}
      >
        {movies.map((movie) =>
          movie.backdrop_path ? (
            <div
              key={movie.id}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                width: '300px',
                cursor: 'pointer',
              }}
              className="movie-card"
            >
              <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    display: 'block',
                  }}
                />
                <div className="hover-title">{movie.title}</div>
              </Link>
            </div>
          ) : null
        )}
      </div>

      {/* Styles */}
      <style>{`
        .hover-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 10px;
          text-align: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .movie-card:hover .hover-title {
          opacity: 1;
        }

        .arrow-button-inline {
          border: none;
          color: white;
          font-size: 18px;
          padding: 8px 12px;
          border-radius: 50%;
          cursor: pointer;
          margin-left: 10px;
          transition: background-color 0.3s ease-in-out;
        }

        .arrow-button-inline:hover {
          background-color: #cc6300;
        }

        @media (max-width: 768px) {
          .arrow-button-inline {
            display: none;
          }
        }

        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MovieList;
