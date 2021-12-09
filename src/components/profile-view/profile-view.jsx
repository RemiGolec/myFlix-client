import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import axios from 'axios';

export function ProfileView(props) {
    console.log('props: ', props);

    const [userData, setUserData] = useState({});

    console.log('fav movies');

    function getUserData() {
        console.log('get user data');
        const token = localStorage.getItem('token')
        axios.get('https://morning-badlands-52426.herokuapp.com/users/' + props.user, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log('user', response.data);
                // Assign the result to the state
                setUserData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log('use effect');
        getUserData()
    }, [])




    return (
        < Card >
            <Card.Body>
                <Card.Title>Profile Name: {userData.Username}</Card.Title>
                <Card.Text>Email: {userData.Email}</Card.Text>
                <Card.Text>Date 0f Birth: {userData.Birthday}</Card.Text>
                <Card.Text>Favourite Movies: {userData.FavouriteMovies}</Card.Text>
                <Button
                    variant="dark"
                    onClick={() => { props.onBackClick() }}>
                    Back
                </Button>
                <Link to={`/profile-update`} >
                    <Button>Update Profile</Button>
                </Link>
                <Link to={'/profile-delete'} >
                    <Button
                        variant="danger"
                    >Delete Profile</Button>
                </Link>
            </Card.Body>
        </Card >
    )
}




