import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class ProfileView extends React.Component {


    render() {
      console.log('this.props: ', this.props);
        const { user, onBackClick } = this.props;

        return (
            < Card >
                <Card.Body>
                    {user && (
                      <>
                        <Card.Title>Profile Name:{user.Username}</Card.Title>
                        <Card.Text>Email:{user.Email}</Card.Text>
                        <Card.Text>Date 0f Birth: {user.Birthday}</Card.Text>
                        <Button
                            variant="dark"
                            onClick={() => { onBackClick() }}
                        >
                            Back
                        </Button>
                      </>
                    )}
                    {!user && <p>Loading...</p>}
                </Card.Body>
            </Card >
        )
    }
}




