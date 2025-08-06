import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { useActorDetails } from '../hooks/useActorDetails';

const Acteur: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { actorDetails, loading, error } = useActorDetails(id);
  const [showFullBio, setShowFullBio] = React.useState(false);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Chargement de l’acteur...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!actorDetails) return null;

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={actorDetails.photoUrl || '/portrait.png'}
              alt={actorDetails.name}
            />
          </Card>
        </Col>
        <Col md={8}>
          <h2>{actorDetails.name}</h2>

          <p>
            {actorDetails.biography
              ? (
                <>
                  {showFullBio
                    ? actorDetails.biography
                    : `${actorDetails.biography.slice(0, 700)}...`}
                  {actorDetails.biography.length > 700 && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0d6efd',
                        cursor: 'pointer',
                        display: 'block',
                        paddingLeft: 0,
                        fontSize: '1em',
                      }}
                      aria-label={showFullBio ? 'Lire moins' : 'Lire plus'}
                    >
                      {showFullBio ? 'Lire moins' : 'Lire plus'}
                    </button>
                  )}
                </>
              )
              : <em>Biographie non disponible pour cet acteur.</em>
            }
          </p>

          <ul>
            <li><strong>Date de naissance :</strong> {actorDetails.birthday}</li>
            {actorDetails.placeOfBirth && (
              <li><strong>Lieu de naissance :</strong> {actorDetails.placeOfBirth}</li>
            )}
            {actorDetails.imdbUrl && (
              <li>
                <a href={actorDetails.imdbUrl} target="_blank" rel="noopener noreferrer">
                  Profil IMDb
                </a>
              </li>
            )}
          </ul>

          <h5 className="mt-4">Films notables</h5>
          <Row>
            {actorDetails.movies.map(movie => (
              <Col key={movie.id} xs={6} md={4} lg={3} className="mb-3">
                <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={movie.posterUrl || '/placeholder.png'}
                      alt={movie.title}
                    />
                    <Card.Body>
                      <strong>{movie.title}</strong><br />
                      <small className="text-muted">{movie.character}</small>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Acteur;
