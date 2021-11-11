import React from 'react';
import './movie-view.scss';
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container className="movie-view">
                <Row >
                    <Col>
                        <Card.Img variant="bottom" src={movie.ImagePath} crossOrigin="anonymous" />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                        </Card.Body>

                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Genre:</Card.Subtitle>
                            <Card.Text>{movie.Genre.Name}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Director:</Card.Subtitle><Card.Text>{movie.Director.Name}</Card.Text>
                            <Button onClick={() => { onBackClick(null); }}>Back</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>

        );
    }
}
