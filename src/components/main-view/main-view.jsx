import React from 'react';
import './main-view.scss';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import NavbarView from '../navbar-view/NavbarView';
import { ProfileUpdate } from '../profile-update/profile-update';
import { ProfileDelete } from '../delete-profile-view/delete-profile-view';


class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      userData: {}
    };
    this.onLoggedOut = this.onLoggedOut.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        // user is the Username string
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      this.getUserData(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://morning-badlands-52426.herokuapp.com/movies', {
      // axios.get('http://localhost:5000/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('movies: ', response.data);
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserData(token) {
    console.log('get user data');
    axios.get('https://morning-badlands-52426.herokuapp.com/users/' + localStorage.getItem('user'), {
      // axios.get('http://localhost:5000/users/' + localStorage.getItem('user'), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('user', response.data);
        // Assign the result to the state
        this.setState({ userData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log('authData: ', authData);
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
    // TODO: Redirect to "/"
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
    const { movies, user, userData } = this.state;
    console.log('user: ', user);
    // if (!user) return <RegistrationView onRegistration={user => this.onRegistration(user)} />;

    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;



    return (

      <Router>

        <NavbarView onLoggedOut={() => this.onLoggedOut()} />
        {/* ----------------  LOGGED IN AS <user>  */}
        <Row>
          {user && <Link to={`/users/${user}`} >logged in as {user}</Link>}
        </Row>

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={({ history }) => {
            if (!user) return <Col>
              <LoginView history={history} onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            console.log("rootpath");
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />

              </Col>
            ))
          }} />

          <Route exact path="/register" render={({ history }) => {
            if (user) return <Redirect to="/" />
            return <RegistrationView history={history} onRegistration={(user) => this.onRegistration(user)} />
          }} />

          <Route exact path={`/users/:username`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <ProfileView userData={userData} user={user} onBackClick={() => history.goBack()} movies={movies} />

          }} />

          <Route exact path={`/profile-update`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <ProfileUpdate userData={userData} user={user} onBackClick={() => history.goBack()} />
          }} />

          <Route exact path={`/profile-delete`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <ProfileDelete userData={userData} user={user} />
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            console.log("movieview_path");

            return <Col lg={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />


        </Row>
      </Router>

    );
  }

}


export default MainView;

