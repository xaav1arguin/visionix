import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api/tmdb';
import type { TMDBMovieListItem } from '../types/TMDBMovieListItem';
import { Container, Row, Col, Card, Spinner, Alert, Form, Pagination } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

const Recherche: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialPage = parseInt(searchParams.get('page') ?? '1', 10);

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      setSearchParams({ q: query, page: String(page) });
    }
  }, [query, page, setSearchParams]);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalPages(1);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    setError(null);
    searchMovies(query, page)
      .then(res => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
        setTotalResults(res.total_results);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({ q: query, page: '1' });
  };

  const goToPage = (p: number) => setPage(p);

  const paginationItems = [];
  const maxButtons = 7;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, page + half);
  if (end - start < maxButtons - 1) {
    if (start === 1) end = Math.min(totalPages, start + maxButtons - 1);
    else if (end === totalPages) start = Math.max(1, end - maxButtons + 1);
  }
  if (start > 1) {
    paginationItems.push(
      <Pagination.Item key={1} onClick={() => goToPage(1)}>1</Pagination.Item>
    );
    if (start > 2) paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
  }
  for (let i = start; i <= end; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === page} onClick={() => goToPage(i)}>{i}</Pagination.Item>
    );
  }
  if (end < totalPages) {
    if (end < totalPages - 1) paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    paginationItems.push(
      <Pagination.Item key={totalPages} onClick={() => goToPage(totalPages)}>{totalPages}</Pagination.Item>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '3rem 1rem' }}>
      <Container>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '20px' }}>
          Résultats pour "<span style={{ color: '#ff7900' }}>{query}</span>"
        </h2>
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Rechercher un film, une série ou un acteur..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              size="lg"
              style={{ borderRadius: '10px', backgroundColor: '#222', color: 'white', border: '1px solid #444' }}
            />
          </Form.Group>
        </Form>

        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="warning" />
            <div>Recherche en cours…</div>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && query.trim() && (
          <>
            <div className="mb-3 text-end">
              {totalResults} résultat{totalResults > 1 ? 's' : ''} — page {page} sur {totalPages}
            </div>
            <Row>
              {movies.length === 0 ? (
                <Col>
                  <Alert variant="info">
                    Aucun résultat pour "<strong>{query}</strong>". Essayez autre chose.<br />
                    <h4 className="mt-3">Peut-être cherchez-vous…</h4>
                  </Alert>
                </Col>
              ) : (
                movies.map(movie => (
                  <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4 d-flex">
                    <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                      <Card className="h-100 bg-dark text-white" style={{ minHeight: '100%' }}>
                        <Card.Img
                          variant="top"
                          src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                            : 'public/placeholder.png'}
                          alt={movie.title}
                          style={{ borderRadius: '10px 10px 0 0', height: '450px', objectFit: 'cover' }}
                        />
                        <Card.Body className="d-flex flex-column">
                          <Card.Title style={{ fontSize: '1.1rem' }}>{movie.title}</Card.Title>
                          <Card.Text className="flex-grow-1">
                            <small className="text-muted">{movie.release_date}</small>
                            <div className="mt-2" style={{ fontSize: '0.85em', color: '#ccc' }}>
                              {movie.overview.slice(0, 80)}...
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              )}
            </Row>
            {totalPages > 1 && (
              <div className="my-4">
                <Pagination className="justify-content-center align-items-center">
                  <Pagination.Prev
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                    style={{ backgroundColor: '#ff7900', borderColor: '#ff7900', color: 'white' }}
                  />
                  {paginationItems.map((item: any, index: number) =>
                    React.cloneElement(item, {
                      style: {
                        backgroundColor: item.props.active ? '#ff7900' : '#111',
                        borderColor: '#444',
                        color: 'white',
                        margin: '0 2px'
                      },
                      key: index
                    })
                  )}
                  <Pagination.Next
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                    style={{ backgroundColor: '#ff7900', borderColor: '#ff7900', color: 'white' }}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Recherche;