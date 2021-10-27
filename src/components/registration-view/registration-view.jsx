import './registration-view.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, } from 'react-bootstrap';

import Logo from '../../logo/logo.png'

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
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
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Please Register</Card.Title>
                  <Form>

                    <Form.Group>
                      <Form.Label>Username:</Form.Label>
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
                        placeholder="Minimum 8 characters"
                        onChange={e => setPassword(e.target.value)}
                        minLength="8"
                        required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        value={email}
                        placeholder="Enter Your email address"
                        onChange={e => setEmail(e.target.value)}
                        required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="string"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required />
                    </Form.Group>
                    <Button
                      className="button"
                      variant="dark"
                      type="submit"
                      onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

RegistrationView.propTypes = {
  registration: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func.isRequired
};