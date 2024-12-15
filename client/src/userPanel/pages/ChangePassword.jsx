import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Button } from 'react-bootstrap';
import { Input, Label } from 'reactstrap';
import { FaLock, FaUser } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const ChangePassword = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />
    }

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const username = localStorage.getItem('username');
        if (newPassword !== confirmPassword) {
            message.error('New password and confirm password do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/change-password', { currentPassword, newPassword, username });
            message.success(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            message.error(error.response.data.message);
        }
    }

    return (
        <>
            <Container style={{ padding: '20px', margin: '20px' }}>
                <Row className="mt-5">
                    <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={{ width: '30%', padding: '20px', margin: '20px' }}>
                            <CardBody>
                                <CardTitle>Change Password</CardTitle>
                                <Form onSubmit={handleChangePassword}>
                                    <FormGroup>
                                        <Label for="currentPassword" style={{display:"flex", alignItems:"center"}} >
                                            <FaLock className="mr-2" style={{display:"inline-block"}}/>
                                            Current Password
                                        </Label>
                                        <Input type="password" id="currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="newPassword" style={{display:"flex", alignItems:"center"}} >
                                            <FaLock className="mr-2"  style={{display:"inline-block"}}/>
                                            New Password
                                        </Label>
                                        <Input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="confirmPassword" style={{display:"flex", alignItems:"center"}} >
                                            <FaUser className="mr-2" style={{display:"inline-block"}}/>
                                            Confirm Password
                                        </Label>
                                        <Input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                    </FormGroup>
                                    <Button variant="primary" type="submit">Change Password</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChangePassword;
