import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Navigate } from 'react-router-dom';

const CreateUser = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />;
    }
    return (
        <Container>
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <CardTitle>Create User</CardTitle>
                            <Form>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Enter username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Enter password" />
                                </FormGroup>
                                <Button color="primary">Create</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;
