import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import axios from 'axios';

export class MovieCard extends React.Component {
  render() {
    const { movie, user } = this.props;
    // const { user } = this.Username;

    const handleAddToFavourites = (e) => {
      e.preventDefault();
      console.log('wish this was working');
      /* Send a request to the server for authentication */
      axios.put('https://morning-badlands-52426.herokuapp.com/users/', {
        Username: { user: Username },
        FavouriteMovies: this.movie,
      })
        /* then call props.onRegistration(username) */
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("movie added to favourites");
          // props.onRegistration(data);
          props.history.push("/");
        })
        .catch(e => {
          console.log('error adding movie to favourites');
          alert('movie NOT added to favourites');
        });
    };


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
        <Button
          className="button"
          variant="dark"
          type="submit"
          onClick={handleAddToFavourites}>
          Add to favourites
        </Button>
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