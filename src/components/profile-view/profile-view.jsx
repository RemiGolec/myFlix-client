import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Form, Button, ButtonGroup, ButtonToolbar, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import axios from 'axios';

export function ProfileView(props) {
    console.log('props: ', props);

    // ---------  VARIABLES FOR UPDATE USER FORM
    const [username, setUsername] = useState(props.userData.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(props.userData.Email);
    const [birthday, setBirthday] = useState(props.userData.Birthday);


    const currentUser = localStorage.getItem('user');
    const { movies, userData } = props;
    console.log(userData, 'userdata');
    const favorites = movies.filter(movie => userData.FavouriteMovies.indexOf(movie._id) > -1);

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

    useEffect(() => {

    }, [])

    return (

        <>
            <Row xs={1} md={1} lg={2} className="g-5">
                {/*  ----------------   USER PROFILE + FAV MOVIES */}
                <Col >
                    < Card >
                        <Card.Body className="card_fav_list">
                            <Card.Title>Profile Name: {userData.Username}</Card.Title>
                            <Card.Text>Email: {userData.Email}</Card.Text>
                            <Card.Header>Favorite movies</Card.Header>


                            {/* {
                                favorites.map(m => {
                                    return (

                                        <Row>
                                            <Col>
                                                <Image
                                                    variant="top"
                                                    src={m.ImagePath}
                                                    crossOrigin="anonymous"
                                                    alt="Card image"
                                                    className="image_fav_list"
                                                />
                                            </Col>
                                            <Col>
                                                <Card.Title>
                                                    <Link key={m._id} to={`/movies/${m._id}`}>
                                                        <div><Button variant="link">{m.Title}</Button></div>
                                                    </Link>
                                                </Card.Title>
                                                <Button
                                                    variant="outline-dark"
                                                    type="submit"
                                                    onClick={() => handleRemoveFromFavourites(m._id)}>
                                                    Remove
                                                </Button>
                                            </Col>
                                        </Row>

                                    )
                                })
                            } */}


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
                                    // onClick={handleUpdateUser}
                                    >
                                        Update Profile
                                    </Button>
                                    <Button
                                        className="button"
                                        variant="dark"
                                        onClick={() => props.history.push("/")}>
                                        go to Login
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

            {/*  ----------------  EXP FAV MOVIES LIST */}
            <Row>
                <Col xs={12}>
                    <h2>FAVOURITE MOVIES</h2>
                </Col>
            </Row>
            <Row>
                {favorites.map(m => {
                    return (
                        <Col xs={12} md={6} lg={3} key={m._id}>
                            <img
                                src={m.ImagePath}
                                crossOrigin="anonymous"
                                className="image_fav_list" />
                            <Link to={`/movies/${m._id}`}>
                                <h4>{m.Title}</h4>
                            </Link>
                            <Button
                                variant="outline-info"
                                onClick={() => handleRemoveFromFavourites(m._id)}>
                                remove from list
                            </Button>

                        </Col>
                    )
                })
                }
            </Row>
        </>
    )
}






