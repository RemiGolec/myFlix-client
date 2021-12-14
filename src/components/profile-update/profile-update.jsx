import React, { useEffect } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import React, { useState } from 'react';
import axios from 'axios';



export function ProfileUpdate(props) {


    console.log("props profile update ", props);
    const [username, setUsername] = useState(props.userData.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(props.userData.Email);
    const [birthday, setBirthday] = useState(props.userData.Birthday);
    const token = localStorage.getItem('token');
    const userInfo = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    }

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
                location.reload();
                props.history.push("/");
            })
            .catch(e => {
                console.log('wrong format or incomplete data');
                alert('fill in all the fields in correct format');
            });
    };


    return (
        <Router>
            <Container>
                <div className="form-container">
                    <Row>
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
                                                variant="dark"
                                                type="submit"
                                                onClick={handleUpdateUser}>
                                                Update
                                            </Button>
                                            <br />
                                            <Button
                                                className="button"
                                                variant="dark"
                                                onClick={() => props.history.push("/")}>
                                                go to Login
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>

                    </Row>
                </div>




            </Container>
        </Router>

    );
}