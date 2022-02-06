import './registration-view.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';



import Logo from '../../logo/logo.png'
import axios from 'axios';

export function RegistrationView(props) {
  console.log('props: ', props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  const validate = () => {

    let isReq = true;

    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be min. 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password min 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1 && email.indexOf('.') === -1) {
      setEmailErr('Email is invalid');
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr('Birthday Required');
      isReq = false;
    }

    return isReq;
  }

  const handleRegister = (e) => {

    e.preventDefault();
    const isReq = validate();

    if (isReq) {
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
          alert('Successful registration, please login');
          props.history.push('/');

        })
        .catch(response => {
          console.error('response');
          alert('unable to register');
        });
    }
  };


  return (
    <Router>
      <Container className="registration-background-container">
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
                          value={username}
                          placeholder="Enter a username"
                          onChange={e => setUsername(e.target.value)} />
                        {usernameErr && <p>{usernameErr}</p>}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          value={password}
                          placeholder="Minimum 6 characters"
                          onChange={e => setPassword(e.target.value)} />
                        {passwordErr && <p>{passwordErr}</p>}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          value={email}
                          placeholder="Enter Your email address"
                          onChange={e => setEmail(e.target.value)} />
                        {emailErr && <p>{emailErr}</p>}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                          type="date"
                          value={birthday}
                          onChange={e => setBirthday(e.target.value)} />
                        {birthdayErr && <p>{birthdayErr}</p>}
                      </Form.Group>
                      <Button
                        className="button"
                        variant="info"
                        type="submit"
                        onClick={handleRegister}>
                        Submit
                      </Button>
                      <Button
                        className="button"
                        variant="outline-info"
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




RegistrationView.propTypes = {
  registration: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func.isRequired
};
