import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Modal, Form } from 'react-bootstrap';

import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const ShowTask = () => {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />
    }
    const [users, setUsers] = useState([]);

    useEffect(() => { 
        const fetchUsers = async () => { 
            const response = await axios.get('http://localhost:5000/api/users/all');
            setUsers(response.data);
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        }
        fetchTasks();
    }, []);

    const highPriorityTasks = tasks.filter(task => task.priority === 'high');
    const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
    const lowPriorityTasks = tasks.filter(task => task.priority === 'low');

    const handleEdit = (task) => {
        setEditTask(task);
        setModal(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const api = `http://localhost:5000/api/tasks/${editTask._id}`;
        await axios.put(api, editTask)
        .then(res => {
            setModal(false);
            setEditTask(null);
            setTasks(tasks.map(task => task._id === editTask._id ? editTask : task));
            message.success(res.data.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <Row>
                <Col >
                    <Card style={{backgroundColor: 'red'}}>
                        <CardBody>
                            <CardTitle>High Priority</CardTitle>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Description</th>
                                        <th>Due Date</th>
                                        <th>User Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {highPriorityTasks.map((task, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.dueDate}</td>
                                            <td>{task.userId ? task.userId.username : ''}</td>
                                            <td>{task.status}</td>
                                            <td>
                                                <Button color="success" onClick={() => handleEdit(task)}>Edit</Button>{' '}
                                                <Button color="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                <Col >
                    <Card style={{backgroundColor: 'yellow'}}>
                        <CardBody>
                            <CardTitle>Medium Priority</CardTitle>
                            <Table hover style={{backgroundColor: 'yellow'}}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Description</th>
                                        <th>Due Date</th>
                                        <th>User Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mediumPriorityTasks.map((task, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.dueDate}</td>
                                            <td>{task.userId ? task.userId.username : ''}</td>
                                            <td>{task.status}</td>
                                            <td>
                                                <Button color="success" onClick={() => handleEdit(task)}>Edit</Button>{' '}
                                                <Button color="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                <Col >
                    <Card style={{backgroundColor: 'green'}}>
                        <CardBody>
                            <CardTitle>Low Priority</CardTitle>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Description</th>
                                        <th>Due Date</th>
                                        <th>User Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowPriorityTasks.map((task, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.dueDate}</td>
                                            <td>{task.userId ? task.userId.username : ''}</td>
                                            <td>{task.status}</td>
                                            <td>
                                                <Button color="success" onClick={() => handleEdit(task)}>Edit</Button>{' '}
                                                <Button color="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" id="title" value={editTask ? editTask.title : ''} onChange={(e) => setEditTask({...editTask, title: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" id="description" value={editTask ? editTask.description : ''} onChange={(e) => setEditTask({...editTask, description: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="dueDate" id="dueDate" value={editTask ? editTask.dueDate : ''} onChange={(e) => setEditTask({...editTask, dueDate: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" name="priority" id="priority" value={editTask ? editTask.priority : ''} onChange={(e) => setEditTask({...editTask, priority: e.target.value})} >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="status" id="status" value={editTask ? editTask.status : ''} onChange={(e) => setEditTask({...editTask, status: e.target.value})} >
                                <option value="pending">Pending</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User</Form.Label>
                            <Form.Control as="select" name="userId" id="userId" value={editTask ? editTask.userId : ''} onChange={(e) => setEditTask({...editTask, userId: e.target.value})} >
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user._id} value={user._id}>{user.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button color="primary">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ShowTask;