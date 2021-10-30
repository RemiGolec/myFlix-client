import React from 'react';
import './main-view.scss';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Logo from '../../logo/logo.png';


class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      })
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://morning-badlands-52426.herokuapp.com/movies', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /*When a movie is clicked, 
  sthis function is invoked and 
  updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, 
  this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  /* NOT SURE THIS CODE IS CORRECT */
  onRegistration(user) {
    this.setState({
      user
    });
  }


  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    /*if (!user) return <RegistrationView onRegistration={user => this.onRegistration(user)} />; */

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* Before the movies have been loaded */
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Container>

        <Navbar className="navbar"
          collapseOnSelect
          expand="lg"
          variant="dark"
          sticky="top">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={Logo}
                height="100"
                className="d-inline-block align-top"
              />{''}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-link">
                <Nav.Link href="#home" >Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row className="main-view justify-content-md-center">
          {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned */}
          {selectedMovie
            ? (
              // Do we need () around the <Row></Row>
              <Col lg={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            :
            (
              movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              ))
            )
          }
        </Row>
      </Container >
    );
  }

}


export default MainView;

