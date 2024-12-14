import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Button  } from 'reactstrap';
import { Navigate } from 'react-router-dom';

const ShowTask = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />
    }

    return (
        <Container>
            <Row>
                <Col >
                    <Card>
                        <CardBody>
                            <CardTitle>Task List</CardTitle>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Description</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Task 1</td>
                                        <td>This is a sample task</td>
                                        <td>2022-12-31</td>
                                        <td>High</td>
                                        <td>Pending</td>
                                        <td>
                                            <Button color="primary">Edit</Button>{' '}
                                            <Button color="danger">Delete</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowTask;
