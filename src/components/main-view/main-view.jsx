import React from 'react';
import './main-view.scss';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

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

  /* NOT SURE THIS CODE IS CORRECT */
  onRegistration(user) {
    this.setState({
      user
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
    const { movies, selectedMovie, user } = this.state;
    // if (!user) return <RegistrationView onRegistration={user => this.onRegistration(user)} />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;



    /* Before the movies have been loaded */
    if (movies.length === 0) return <div className="main-view" />;

    return (

      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            console.log("rootpath");
            return movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            console.log("movieview_path");
            return <Col lg={8}>

            </Col>
          }} />
        </Row>
      </Router>

    );
  }

}


export default MainView;

