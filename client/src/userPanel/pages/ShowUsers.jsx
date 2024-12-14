import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Navigate } from 'react-router-dom';

const ShowUsers = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />
    }
    return (
        <Container>
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <CardTitle>Users</CardTitle>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Abhay Dixit</td>
                                        <td>abhaydixitdev</td>
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

export default ShowUsers;
