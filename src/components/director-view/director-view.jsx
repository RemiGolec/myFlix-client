import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class DirectorView extends React.Component {
    render() {
        console.log('director-view');

        const { director, onBackClick } = this.props;

        return (
            <Card className="bg-white">
                <Card.Body>
                    <Card.Title>{director.Name}</Card.Title>
                    <Card className="bg-dark text-white movie_card">
                        <Card.Img
                            variant="top"
                            src={director.ImagePath}
                            crossOrigin="anonymous"
                            alt="Card image"
                            className="card_image" />
                    </Card>
                    <Card.Text>{director.Bio}</Card.Text>
                    <Card.Text>Date 0f Birth: {director.BirthDate}</Card.Text>
                    <Button
                        variant="dark"
                        onClick={() => { onBackClick() }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        BirthDate: PropTypes.string

    }).isRequired
};

