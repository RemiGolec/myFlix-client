import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
        const { genre } = this.props;

        return (
            <Card className="bg-white movie_card_background">
                <Card.Title>{genre.Name}</Card.Title>
                <Card className="bg-dark text-white movie_card">
                </Card>
            </Card>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,

    }).isRequired

};


