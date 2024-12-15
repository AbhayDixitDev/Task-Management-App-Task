import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
// import 'antd/dist/antd.css';
// import 'tailwindcss/base.css';
// import 'tailwindcss/components.css';
// import 'tailwindcss/utilities.css';


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
        <Container className=" flex justify-center items-center">
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Col className="bg-black rounded-lg ">
                    <Card className="bg-transparent border-0">
                        <Card.Body className="text-white">
                            <Card.Title>Assign Task</Card.Title>
                            <Form onSubmit={handleSubmit} className="space-y-2 ">
                                <Form.Group className="mb-2 " controlId="title">
                                    <Form.Label className="text-white">Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="description">
                                    <Form.Label className="text-white">Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="dueDate">
                                    <Form.Label className="text-white">Due Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter due date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="priority">
                                    <Form.Label className="text-white">Priority</Form.Label>
                                    <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                        <option value="">Select Priority</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="userId">
                                    <Form.Label className="text-white">User</Form.Label>
                                    <Form.Select value={userId} onChange={(e) => setUserId(e.target.value)}>
                                        <option value="">Select User</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id}>{user.username}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit">Assign</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AssignTask;
