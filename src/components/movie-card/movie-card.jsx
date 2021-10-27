import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container, Link } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <a
        className="movie_card_link"
        onClick={() => onMovieClick(movie)}>
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
      </a>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};