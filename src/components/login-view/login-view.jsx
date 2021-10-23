
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Card } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Group>
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
                      required/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card.Group>
          </Card>
        </Col>
      </Row>
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
