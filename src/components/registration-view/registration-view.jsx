import './registration-view.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';



import Logo from '../../logo/logo.png'
import axios from 'axios';

export function RegistrationView(props) {
  console.log("props: ", props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://morning-badlands-52426.herokuapp.com/users', {
      // axios.post('https://localhost:5000/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      /* then call props.onRegistration(username) */
      .then(response => {
        const data = response.data;
        console.log(data);
        alert("successful registration");
        // props.onRegistration(data);
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
                          type="email"
                          value={email}
                          placeholder="Enter Your email address"
                          onChange={e => setEmail(e.target.value)}
                          required />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                          type="date"
                          // pattern="\d{4}[\-]\d{2}[\-]\d{2}"
                          value={birthday}
                          onChange={e => setBirthday(e.target.value)}
                          required />
                      </Form.Group>
                      <Button
                        className="button"
                        variant="dark"
                        type="submit"
                        onClick={handleRegister}>
                        Submit
                      </Button>
                      <Button onClick={() => props.history.push("/")}>go to Login</Button>
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




RegistrationView.propTypes = {
  registration: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func.isRequired
};
