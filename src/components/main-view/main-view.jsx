import React from 'react';
import './main-view.scss';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';

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

  /* NOT SURE THIS CODE IS CORRECT */
  onRegistration(user) {
    this.setState({
      user
    });
  }

  getMovies(token) {
    axios.get('https://morning-badlands-52426.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
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

  render() {
    console.log("render")
    const { movies, user } = this.state;
    // if (!user) return <RegistrationView onRegistration={user => this.onRegistration(user)} />;
    // console.log('should display movies now after successful registration but it isn\'t ');

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    /* Before the movies have been loaded */
    if (movies.length === 0) return <div className="main-view" />;

    return (

      <Router>

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
                <Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            console.log("rootpath");
            return movies.map(m => (
              <Col md={3}>
                <MovieCard key={m._id} movie={m} />
              </Col>
            ))
          }} />

          <Route exact path="/movies/:movieId" render={({ match }) => {
            console.log("movieview_path");
            return <Col lg={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />

            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            </Col>
          }} />


        </Row>
      </Router>

    );
  }

}


export default MainView;

