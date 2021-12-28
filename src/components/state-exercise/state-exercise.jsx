import React from "react";
import ReactDom from "react-dom";
import { Card } from "react-bootstrap";

function StateExercise() {

    console.log('state-exercise');
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Welcome:</Card.Title>
                            <Card.Text>enter your name here</Card.Text>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </>
    );
}

ReactDom.render(<StateExercise />, document.getElementById('root'));



