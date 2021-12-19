import axios from 'axios';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

export function ProfileDelete(props) {

    console.log("props profile delete", props);
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('user');


    const handleDeleteUser = (e) => {
        e.preventDefault();

        axios.delete('https://morning-badlands-52426.herokuapp.com/users/' + currentUser,
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('user deleted');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                location.reload();
                props.history.push("/");
            })
            .catch(e => {
                console.log('error in deleting user');
            });
    }


    return (
        < Card >
            <Card.Body>
                <Card.Title>You're about to delete USER profile</Card.Title>
                {/* <Card.Title>Profile Name: {userData.Username}</Card.Title>
                <Card.Text>Email: {userData.Email}</Card.Text>
                <Card.Text>Date 0f Birth: {userData.Birthday}</Card.Text> */}
                <Button
                    className="button"
                    variant="dark"
                    onClick={() => { props.onBackClick() }}
                >
                    Cancel
                </Button>
                <Button
                    className="button"
                    style={{ float: 'right' }}
                    variant="danger"
                    type="submit"
                    onClick={handleDeleteUser}>
                    Delete Profile
                </Button>
            </Card.Body>
        </Card >
    )

}



