import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type FilmCardProps = {
  id: number;
  title: string;
  posterPath: string;
};

const FilmCard: React.FC<FilmCardProps> = ({ id, title, posterPath }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{title}</Card.Title>
        <div className="mt-auto text-center">
          <Link to={`/film/${id}`}>
            <Button variant="primary" size="sm">Voir le film</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilmCard;
