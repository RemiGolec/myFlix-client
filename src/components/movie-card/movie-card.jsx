import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container } from 'react-bootstrap';

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
        className="movie_card"
        bg="dark">
        <Card.Img 
          variant="top" 
          src={movie.ImagePath} 
          crossOrigin="anonymous"
          className="card_image"
          />
        <Card.Body className="card-body">
          <Card.Title>{movie.Title}</Card.Title>
          {/* <Card.Text>{movie.Description}</Card.Text> */}
          <Button  variant="link">Open</Button>
        </Card.Body>
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