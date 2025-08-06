import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  fetchTMDBMovie,
  fetchTMDBCredits,
  fetchRecommendedMovies,
} from '../api/tmdb';
import type { TMDBMovie } from '../types/TMDBMovie';
import type { TMDBCredits } from '../types/TMDBCredits';
import type { TMDBMoviesByGenreResponse } from '../types/TMDBMoviesByGenreResponse';

const Film: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const [cast, setCast] = useState<TMDBCredits['cast']>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<TMDBMoviesByGenreResponse['results']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        const [movieData, creditsData, recommendedData] = await Promise.all([
          fetchTMDBMovie(id),
          fetchTMDBCredits(id),
          fetchRecommendedMovies(id),
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        setRecommendedMovies(recommendedData.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données TMDB :', error);
        setError('Impossible de charger les données.');
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <p style={{ color: 'white' }}>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!movie) return null;

  // Calcul rating sur 5 étoiles
  const rating = movie.vote_average / 2;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<i key={i} className="bi bi-star-fill" style={{ color: '#ff7900' }} />);
    } else if (i - rating < 1) {
      stars.push(<i key={i} className="bi bi-star-half" style={{ color: '#ff7900' }} />);
    } else {
      stars.push(<i key={i} className="bi bi-star" style={{ color: '#ff7900' }} />);
    }
  }

  return (
    <>
      {/* SECTION HERO */}
      <div style={{ position: 'relative', height: '900px', overflow: 'hidden', color: 'white' }}>
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.95))',
            zIndex: 1,
          }}
        />
        <Container
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: '#ff7900', fontSize: '5rem', fontWeight: 'bold', fontFamily: 'Bebas Neue, sans-serif', marginBottom: '0.3rem' }}>
            {movie.title}
          </h1>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {stars}
            <span style={{ marginLeft: '8px' }}>{movie.vote_average.toFixed(1)}/10</span>
            <span>· {new Date(movie.release_date).getFullYear()}</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', maxWidth: '250px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{movie.runtime} Min</span>
            <div style={{ flexGrow: 1, height: '3px', backgroundColor: '#ff7900', borderRadius: '2px', alignSelf: 'center' }} />
          </div>
          <p style={{ marginTop: '10px', fontSize: '1rem', maxWidth: '800px', lineHeight: '1.5' }}>{movie.overview}</p>
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}/watch`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#ff7900',
              color: 'white',
              textDecoration: 'none',
              padding: '6px 14px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              marginTop: '15px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content',
            }}
          >
            Regarder
          </a>
        </Container>
      </div>

      {/* SECTION ACTEURS */}
      <div style={{ backgroundColor: 'black', padding: '50px 0' }}>
        <Container>
          <h3 style={{ marginBottom: '20px', color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif' }}>
            Casting principal :
          </h3>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', paddingBottom: '1rem' }}>
            {cast.map((actor) => (
              <Card
                key={actor.id}
                bg="dark"
                text="light"
                style={{ minWidth: '140px', maxWidth: '140px', flex: '0 0 auto', border: '1px solid #333' }}
              >
                <Card.Img
                  variant="top"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : '../public/placeholder.png'
                  }
                  style={{ height: '210px', objectFit: 'cover' }}
                />
                <Card.Body style={{ padding: '0.5rem' }}>
                  <Card.Title style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{actor.name}</Card.Title>
                  <Card.Text style={{ fontSize: '0.75rem', color: '#bbb' }}>{actor.character}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* SECTION FILMS RECOMMANDÉS */}
      <div style={{ backgroundColor: 'black', padding: '50px 0' }}>
        <Container>
          <h3 style={{ marginBottom: '20px', color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif' }}>
            Films recommandés :
          </h3>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', paddingBottom: '1rem' }}>
            {recommendedMovies.map((film) => (
              <Card
                key={film.id}
                bg="dark"
                text="light"
                style={{ minWidth: '140px', maxWidth: '140px', flex: '0 0 auto', border: '1px solid #333' }}
              >
                <Card.Img
                  variant="top"
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/w185${film.poster_path}`
                      : '../public/placeholder.png'
                  }
                  style={{ height: '210px', objectFit: 'cover' }}
                />
                <Card.Body style={{ padding: '0.5rem' }}>
                  <Card.Title style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{film.title}</Card.Title>
                  <Card.Text style={{ fontSize: '0.75rem', color: '#bbb' }}>
                    {new Date(film.release_date).getFullYear()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Film;
