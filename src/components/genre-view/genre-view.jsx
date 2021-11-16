import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
        console.log('genre-view');

        const { genre, onBackClick } = this.props;

        return (
            <Card className="bg-white">
                <Card.Body>
                    <Card.Title>{genre.Name}</Card.Title>
                    <Card className="bg-dark text-white movie_card">
                        <Card.Text>{genre.Description}</Card.Text>
                    </Card>
                    <Button
                        variant="dark"
                        onClick={() => { onBackClick() }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string

    }).isRequired

};


