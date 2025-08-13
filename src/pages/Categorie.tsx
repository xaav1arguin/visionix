import React, { useEffect, useState } from 'react';
import { Container, Dropdown, Spinner, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const genreList = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comédie' },
  { id: 27, name: 'Horreur' },
  { id: 878, name: 'Science-fiction' },
  { id: 10749, name: 'Romance' },
  { id: 16, name: 'Animation' },
  { id: 53, name: 'Thriller' },
  { id: 18, name: 'Drame' },
  { id: 12, name: 'Aventure' },
];

const Categorie: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState(genreList[0]);
  const [sortOption, setSortOption] = useState('popularity.desc');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=34711b1563106ce68d5381f00d0d8ce1&language=fr-FR&sort_by=${sortOption}&with_genres=${selectedGenre.id}&page=${page}`
        );
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB limite a 500 pages
      } catch (error) {
        console.error('Erreur lors du chargement des films :', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, sortOption, page]);

  const handleSelectGenre = (eventKey: string | null) => {
    const genre = genreList.find((g) => g.id.toString() === eventKey);
    if (genre) {
      setSelectedGenre(genre);
      setPage(1);
    }
  };

  const handleSortChange = (eventKey: string | null) => {
    if (eventKey) {
      setSortOption(eventKey);
      setPage(1);
    }
  };

  const paginationItems = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === page}
        onClick={() => setPage(i)}
        style={{ backgroundColor: i === page ? '#ff7900' : 'transparent', borderColor: '#ff7900', color: '#fff' }}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '3rem 1rem' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontFamily: 'Bebas Neue', color: '#ff7900', fontSize: '3rem', margin: 0 }}>
            Explorer les catégories
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Dropdown onSelect={handleSelectGenre} autoClose="outside">
              <Dropdown.Toggle variant="dark" style={{ backgroundColor: '#ff7900', border: 'none', fontWeight: 'bold' }}>
                {selectedGenre.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {genreList.map((genre) => (
                  <Dropdown.Item key={genre.id} eventKey={genre.id.toString()}>
                    {genre.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={handleSortChange} autoClose="outside">
              <Dropdown.Toggle variant="dark" style={{ backgroundColor: '#ff7900', border: 'none', fontWeight: 'bold' }}>
                Trier par
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="original_title.asc">Alphabétique</Dropdown.Item>
                <Dropdown.Item eventKey="release_date.desc">Récents</Dropdown.Item>
                <Dropdown.Item eventKey="popularity.desc">Populaires</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {movies.map((movie) => (
                  <Link to={`/film/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      backgroundColor: '#111',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s ease-in-out'
                    }} className="hover-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '10px', textAlign: 'center' }}>
                        <h5 style={{ fontSize: '1.1rem', fontFamily: 'Bebas Neue' }}>{movie.title}</h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Pagination className="justify-content-center mt-4">{paginationItems}</Pagination>
            </>
          )}
        </div>
      </Container>

      <style>{`
        .hover-card:hover {
          transform: scale(1.05);
        }
        .pagination .page-item .page-link {
          background-color: transparent;
          border: 1px solid #ff7900;
          color: #fff;
        }
        .pagination .page-item.active .page-link {
          background-color: #ff7900;
          border-color: #ff7900;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Categorie;
