import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="bg-transparent movie_card_background">
        <Card
          key={movie._id}
          className="bg-dark text-white movie_card">
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            crossOrigin="anonymous"
            alt="Card image"
            className="card_image" />
          <Card.ImgOverlay className="image-overlay">
            <Card.Title className="card-title_image-overlay">{movie.Title}</Card.Title>
          </Card.ImgOverlay>
        </Card>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">VIEW</Button>
        </Link>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
      </Card>

    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthDate: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};