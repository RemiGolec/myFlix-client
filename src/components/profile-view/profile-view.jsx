import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import axios from 'axios';

export function ProfileView(props) {
    console.log('props: ', props);

    const [userData, setUserData] = useState({});

    function getUserData(token) {
        console.log('get user data');
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
        getUserData(localStorage.getItem('token'))
    }, [])

    /**
     * TODO
     * - Step1: create a userData variable using setState. Example of this is in the RegistrationView. The default should be null
     * - Step2: Create a function called `getUserData`.
     * - Step3: In getUSerData, make an axios GET request to get the user by username. The username to use is in the props.
     *    - An example of the GET request: Take a look at the getMovies function
     *    - The API url to get a user by username: Take a look at your postman or the server
     * - Step4: When you get the data back from the server in the `.then` function, use setState to store the user information in state of this component
     * - Step5: finally display the user information stored in state in the card below
     */

    return (
        < Card >
            <Card.Body>
                <Card.Title>Profile Name: {userData.Username}</Card.Title>
                <Card.Text>Email: {userData.Email}</Card.Text>
                <Card.Text>Date 0f Birth: {userData.Birthday}</Card.Text>
                <Button
                    variant="dark"
                    onClick={() => { onBackClick() }}>
                    Back something
                </Button>
                <Link to={`/profile-update`} >
                    <Button>Update Profile</Button>
                </Link>
                <Link to={'/profile-delete'} >
                    <Button>Delete Profile</Button>
                </Link>
            </Card.Body>
        </Card >
    )
}




