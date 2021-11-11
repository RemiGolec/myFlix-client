
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Card, Col, Row, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

import Logo from '../../logo/logo.png';
import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://morning-badlands-52426.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      /* then call props.onLoggedIn(username),
      which provides the username to our parent component (child to parent communication) */
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
        alert('please enter valid username and password');
      });
  };


  return (
    <Container>
      <div className="image-container">
        <img
          className="registration-view_logo"
          src={Logo}
        />
      </div>
      <div className="form-container">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Please Login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required />
                  </Form.Group>
                  <ButtonToolbar>
                    <ButtonGroup className="me-5">
                      <Button
                        className="button"
                        variant="dark"
                        type="submit"
                        onClick={handleSubmit}>
                        Login
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button
                        className="button"
                        variant="dark"
                        type="submit"
                        onClick={RegistrationView}>
                        Register work in progress
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>

  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};
