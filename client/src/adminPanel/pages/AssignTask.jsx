import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';


const AssignTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/all')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit =async (e) => {
        e.preventDefault();
        const api = "http://localhost:5000/api/tasks/create";
        await axios.post(api, { title, description, dueDate, priority, userId })
        .then(res => {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('');
            setUserId('');
            message.success(res.data.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Assign Task</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text" name="title" id="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="textarea" name="description" id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dueDate">Due Date</Label>
                                    <Input type="date" name="dueDate" id="dueDate" placeholder="Enter due date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="priority">Priority</Label>
                                    <Input type="select" name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                        <option value="">Select Priority</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="userId">User</Label>
                                    <Input type="select" name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)}>
                                        <option value="">Select User</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id}>{user.username}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <Button color="primary">Assign</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AssignTask;
