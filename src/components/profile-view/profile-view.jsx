import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Form, Button, ButtonGroup, ButtonToolbar, Row, Col, Image, Figure } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import axios from 'axios';
import FigureImage from 'react-bootstrap/esm/FigureImage';


export function ProfileView(props) {
    console.log('props: ', props);


    const [username, setUsername] = useState(props.userData.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(props.userData.Email);
    const [birthday, setBirthday] = useState(props.userData.Birthday);

    useEffect(() => {
        setUsername(props.userData.Username);
        // setPassword(props.password);
        setEmail(props.userData.Email);
        setBirthday(props.userData.Birthday);
    }, [props.userData.Username]);

    const token = localStorage.getItem('token');
    const userInfo = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    }
    const currentUser = localStorage.getItem('user');
    const { movies, userData } = props;
    console.log(userData, 'userdata');

    const favourites = movies.filter(movie => (
        userData.FavouriteMovies && userData.FavouriteMovies.indexOf(movie._id) > -1
    ));





    const handleRemoveFromFavourites = (movieId) => {
        // e.preventDefault();
        const token = localStorage.getItem('token');
        console.log('remove from Favourite movies');
        axios.delete(`https://morning-badlands-52426.herokuapp.com/users/${currentUser}/movies/${movieId}`,
            // axios.delete(`http://localhost:5000/users/${currentUser}/movies/${movieId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert("movie removed from favourites");
                location.reload();


            })
            .catch(e => {
                console.log('error removing movie from favourites');
                alert('movie NOT removed from favourites');
            });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.put('https://morning-badlands-52426.herokuapp.com/users/' + props.userData.Username,
            userInfo,
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            /* then call props.onRegistration(username) */
            .then(response => {
                const data = response.data;
                console.log(data);
                alert("user updated");
                localStorage.setItem('user', username);
                // location.reload();
                props.history.push("/");
            })
            .catch(e => {
                console.log('wrong format or incomplete data');
                alert('fill in all the fields in correct format');
            });
    };


    return (

        <>
            <Row xs={1} md={1} lg={2} className="g-5">
                {/*  ----------------   USER PROFILE */}
                <Col >
                    < Card >
                        <Card.Body className="card_fav_list">
                            <Card.Title>Profile Name: {userData.Username}</Card.Title>
                            <Card.Text>Email: {userData.Email}</Card.Text>
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button
                                    className="button"
                                    variant="dark"
                                    onClick={() => { props.onBackClick() }}>
                                    Back
                                </Button>
                            </ButtonGroup>
                            {/* <Link to={`/profile-update`} >
                            <Button>Update Profile</Button>
                        </Link> */}
                        </Card.Body>
                    </Card >
                </Col>

                {/*  ----------------   UPDATE USER FORM */}
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Update User</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Enter a username"
                                            required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            placeholder="type current password or update password"
                                            onChange={e => setPassword(e.target.value)}
                                            minLength="8"
                                            required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            placeholder="Enter Your email address"
                                            onChange={e => setEmail(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            // pattern="\d{4}[\-]\d{2}[\-]\d{2}"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Button
                                        className="button"
                                        variant="warning"
                                        type="submit"
                                        onClick={handleUpdateUser}>
                                        Update Profile
                                    </Button>
                                    <Link to={'/profile-delete'} >
                                        <Button
                                            className="button"
                                            variant="danger"
                                        >Delete Profile</Button>
                                    </Link>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>

            {/*  ----------------   FAV MOVIES LIST */}
            <Card className="fav-movies-card">
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <Card.Title>
                                Favourite Movies
                            </Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        {favourites.map(m => {
                            return (
                                <Col xs={12} md={6} lg={3} key={m._id} className="fav-movie" >
                                    <Figure>
                                        <Link to={`/movies/${m._id}`}>
                                            <Figure.Image
                                                src={m.ImagePath}
                                                width={150}
                                                alt={m.Title}
                                                crossOrigin="anonymous"
                                                className="image_fav_list" />
                                            <Figure.Caption>
                                                {m.Title}
                                            </Figure.Caption>
                                        </Link>
                                        <Button
                                            variant="outline-info"
                                            onClick={() => handleRemoveFromFavourites(m._id)}>
                                            Remove
                                        </Button>
                                    </Figure>

                                </Col>
                            )
                        })
                        }
                    </Row>
                </Card.Body>
            </Card>

        </>
    )
}






