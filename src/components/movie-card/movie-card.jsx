import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container, Col, Row, Figure, CardGroup, CardImg, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import axios from 'axios';

export class MovieCard extends React.Component {

  render() {
    let { movie, addToFavourites } = this.props;
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(token, 'token');

    const handleAddToFavourites = (e) => {
      e.preventDefault();
      console.log('add to Favourite movies');
      axios.post(`https://morning-badlands-52426.herokuapp.com/users/${currentUser}/movies/${movie._id}`, {},
        // axios.post(`http://localhost:5000/users/${currentUser}/movies/${movie._id}`, {},
        {
          headers: { Authorization: `Bearer ${token}` },
        })
        /* then call props.onRegistration(username) */
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("movie added to favourites");
          console.log(movie._id, 'movie id');
          addToFavourites(movie._id);
          console.log('after movie id');
        })
        .catch(e => {
          console.log('error adding movie to favourites');
          alert('movie NOT added to favourites');
        });
    };



    return (
      <>
        <CardGroup className="card_main-view">
          <Card>
            <Container className="card-container">
              <Card.Title>
                {movie.Title}
              </Card.Title>
              <Card.Subtitle>
                {movie.Director.Name}
              </Card.Subtitle>
              <CardImg className="card-img-top"
                src={movie.ImagePath}
                crossOrigin="ananymous"
              />
            </Container>
            <Container>
              <Row>
                <Col>
                  <Link to={`/movies/${movie._id}`} className="link_view-details">
                    View details
                  </Link>

                  {/* <Col>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                </Col> */}

                  <Button className="button_card_main-view"
                    style={{ margin: "10px" }}
                    size="sm"
                    type="submit"
                    variant="outline-info"
                    onClick={handleAddToFavourites}>
                    Add to favourites
                  </Button>
                </Col>
              </Row>


            </Container>
          </Card>
        </CardGroup>
      </>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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