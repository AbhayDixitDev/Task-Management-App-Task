import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Navigate } from 'react-router-dom';

const AssignTask = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Assign Task</CardTitle>
                            <Button color="primary">Assign</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AssignTask;
