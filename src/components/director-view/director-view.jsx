import React from 'react';
import { Container, Card, h1 } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class DirectorView extends React.Component {
    render() {
        console.log('director-view');

        const { director, movie } = this.props;

        return (
            <Card className="bg-white movie_card_background">
                <Card.Title>{director.Name}</Card.Title>
                <Card
                    className="bg-dark text-white movie_card">
                    <Card.Img
                        variant="top"
                        src={director.ImagePath}
                        crossOrigin="anonymous"
                        alt="Card image"
                        className="card_image" />
                </Card>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,

    }).isRequired
};

