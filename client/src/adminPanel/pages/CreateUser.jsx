import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const CreateUser = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />;
    }
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { name, username, password });
           message.success(res.data.message);
        } catch (err) {
            if (err.response.status === 500) {
                console.error('Internal Server Error');
            } else {
                console.error(err);
            }
        }
    }

    return (
        <Container className="dark-theme"  style={{ borderRadius: '1rem',alignContent: 'center' }}>
            <Row>
                <Col md={{ size: 6, offset: 3 }} >
                    <Card className="bg-black">
                        <CardBody>
                            <CardTitle className="text-white" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize: '1.5rem'}}>Create User</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label className="text-white" for="name" style={{display: 'flex', alignItems: 'center',fontSize: '1.2rem'}}>
                                        Name
                                    </Label>
                                    <Input type="text" name="name" id="name" placeholder="Enter name" className="bg-gray-800 text-black" onChange={(e) => setName(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white" for="username" style={{display: 'flex', alignItems: 'center',fontSize: '1.2rem'}}>
                                        <FaUser className="mb-1" style={{marginRight: '0.5rem'}} /> Username
                                    </Label>
                                    <Input type="text" name="username" id="username" placeholder="Enter username" className="bg-gray-800 text-black" onChange={(e) => setUsername(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white" for="password" style={{display: 'flex', alignItems: 'center',fontSize: '1.2rem'}}>
                                        <FaLock className="mb-1" style={{marginRight: '0.5rem'}} /> Password
                                    </Label>
                                    <Input type="password" name="password" id="password" placeholder="Enter password" className="bg-gray-800 text-black" onChange={(e) => setPassword(e.target.value)} />
                                </FormGroup>
                                <Button color="primary" type='submit' className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
                                    Create
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;
