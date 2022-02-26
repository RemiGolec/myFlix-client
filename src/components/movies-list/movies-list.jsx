import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter, addToFavourites } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <Card>
            <Card.Body>
                <Row>
                    <Col md={3} style={{ margin: '1em' }}>
                        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                    </Col>
                </Row>
                <Row >
                    {filteredMovies.map(m => (
                        <Col xs={12} sm={6} md={4} lg={4} xl={3} key={m.id} >
                            <MovieCard movie={m} addToFavourites={addToFavourites} />
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>


    </>;
}

export default connect(mapStateToProps)(MoviesList);