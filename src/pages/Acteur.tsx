import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { useActorDetails } from '../hooks/useActorDetails';
import type { ActorMovie } from '../types/ActorDetails';

const Acteur: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { actorDetails, loading, error } = useActorDetails(id);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <Container className="py-5 text-center" style={{ maxWidth: '1100px', paddingLeft: '15px', paddingRight: '15px' }}>
          <Spinner animation="border" />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <Container className="py-5" style={{ maxWidth: '1100px', paddingLeft: '15px', paddingRight: '15px' }}>
          <Alert variant="danger">{error}</Alert>
        </Container>
      </div>
    );
  }

  if (!actorDetails) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <Container className="py-5" style={{ maxWidth: '1100px', paddingLeft: '15px', paddingRight: '15px' }}>
          <Alert variant="warning">Acteur introuvable.</Alert>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <Container className="py-5" style={{ maxWidth: '1100px', paddingLeft: '15px', paddingRight: '15px' }}>
        {/* Section infos acteur */}
        <Row className="mb-4">
          <Col md={4}>
            <img
              src={actorDetails.photoUrl}
              alt={actorDetails.name}
              className="img-fluid rounded shadow-sm"
            />
          </Col>
          <Col md={8}>
            <h2>{actorDetails.name}</h2>
            {actorDetails.birthday && (
              <p style={{ marginBottom: '1rem', color: 'white' }}>
                <strong style={{ color: '#ff7900' }}>Date de naissance :</strong> {actorDetails.birthday}
              </p>
            )}
            {actorDetails.placeOfBirth && (
              <p style={{ marginBottom: '2rem', color: 'white' }}>
                <strong style={{ color: '#ff7900' }}>Lieu de naissance :</strong> {actorDetails.placeOfBirth}
              </p>
            )}
            {actorDetails.biography ? (
              <p>
                {showFullBio
                  ? actorDetails.biography
                  : `${actorDetails.biography.slice(0, 700)}...`}
                {actorDetails.biography.length > 700 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff7900',
                      cursor: 'pointer',
                      display: 'block',
                      paddingLeft: 3,
                      fontSize: '1em',
                    }}
                  >
                    {showFullBio ? 'Lire moins' : 'Lire plus'}
                  </button>
                )}
              </p>
            ) : (
              <p><em>Biographie non disponible pour cet acteur.</em></p>
            )}
          </Col>
        </Row>

        {/* Section films notables */}
        {actorDetails.movies.length > 0 && (
          <>
            <h3 className="mt-5 mb-3" style={{ color: '#ff7900', fontFamily: 'Bebas Neue, sans-serif', }}>
              Films notables
            </h3>

            <Row className="flex-nowrap overflow-auto gx-3" style={{ paddingBottom: '1rem' }}>
              {actorDetails.movies.map((movie: ActorMovie) => (
                <Col key={movie.id} xs={6} sm={4} md={3} lg={2} className="mb-4 d-flex">
                  <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                    <Card
                      className="h-100"
                      bg="dark"
                      text="light"
                    >
                      <Card.Img
                        variant="top"
                        src={movie.posterUrl}
                        alt={movie.title}
                        style={{ height: '210px', objectFit: 'cover' }}
                      />
                      <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Card.Title style={{ fontSize: '0.9rem', minHeight: '2.5rem' }}>
                          {movie.title}
                        </Card.Title>
                        {movie.character && (
                          <Card.Text style={{ fontSize: '0.65rem', color: '#ccc' }}>
                            Rôle : {movie.character}
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Acteur;
