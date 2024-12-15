import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Notification from 'react-notification-system';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';

const ShowTask = () => {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />
    }
    const [users, setUsers] = useState([]);

    useEffect(() => { 
        const fetchUsers = async () => { 
            try {
                const response = await axios.get('http://localhost:5000/api/users/all');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        setEditTask(task);
        setModal(true);
    }

    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            try {
                const res = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
                setTasks(tasks.filter(task => task._id !== taskId));
                Notification.error({
                    message: res.data.message,
                    placement: 'topRight',
                    duration: 5,
                    icon: <FaBell style={{ color: 'red' }} />
                });
            } catch (err) {
                console.error(err);
                Notification.error({
                    message: "Error deleting task",
                    placement: 'topRight',
                    duration: 5,
                    icon: <FaBell style={{ color: 'red' }} />
                });
            }
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const api = `http://localhost:5000/api/tasks/${editTask?._id}`;
        try {
            const res = await axios.put(api, editTask);
            setModal(false);
            setEditTask(null);
            setTasks(tasks.map(task => task._id === editTask?._id ? editTask : task));
            Notification.success({
                message: res.data.message,
                placement: 'topRight',
                duration: 5,
                icon: <FaBell style={{ color: 'green' }} />
            });
        } catch (err) {
            console.error(err);
            Notification.error({
                message: "Error updating task",
                placement: 'topRight',
                duration: 5,
                icon: <FaBell style={{ color: 'red' }} />
            });
        }
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;

    // Sort tasks by priority
    const sortedTasks = tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalTasks = sortedTasks.filter(task => task.status !== 'complete').length;
    const totalPages = Math.ceil(totalTasks / itemsPerPage);

    const getRowStyle = (priority) => {
        switch (priority) {
            case 'high':
                return { background: 'linear-gradient(to right, rgba(255, 50, 0, 0.7), rgba(255, 0, 50, 0.5))' }; // Red gradient
            case 'medium':
                return { background: 'linear-gradient(to right, rgba(255, 155, 100, 0.7), rgba(255, 255, 100, 0.5))' }; // Yellow gradient
            case 'low':
                return { background: 'linear-gradient(to right, rgba(0, 255, 0, 0.7), rgba(0, 255, 0, 0.5))' }; // Green gradient
            default:
                return {};
        }
    };

    return (
       <>
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle style={{color: 'red', fontSize: '20px'}}>Total Due Tasks: {totalTasks}</CardTitle>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Due Date</th>
                                        <th>User Name</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTasks.map((task, index) => (
                                        <tr key={task._id} style={getRowStyle(task.priority)}>
                                            <th scope="row">{indexOfFirstTask + index + 1}</th>
                                            <td>{task.title}</td>
                                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                            <td>{task.userId?.username || ''}</td>
                                            <td>{task.status}</td>
                                            <td>{task.priority}</td>
                                            <td>
                                                <Button color="primary" style={{backgroundColor:"lightgreen"}} onClick={() => handleEdit(task)}>Edit</Button>
                                                <Button color="secondary" style={{backgroundColor:"red"}} onClick={() => handleDelete(task._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => paginate(1)} />
                <Pagination.Prev onClick={() => currentPage > 1 && paginate(currentPage - 1)} />
                {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => currentPage < totalPages && paginate(currentPage + 1)} />
                <Pagination.Last onClick={() => paginate(totalPages)} />
            </Pagination>
            <Modal show={modal} onHide={() => setModal(false)}>
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
                            <Form.Control as="select" name="priority" id="priority" value={editTask ? editTask.priority : ''} onChange={(e) => setEditTask({...editTask, priority: e.target.value})}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="status" id="status" value={editTask ? editTask.status : ''} onChange={(e) => setEditTask({...editTask, status: e.target.value})}>
                                <option value="pending">Pending</option>
                                <option value="inprogress">In Progress</option>
                                <option value="complete">Complete</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User</Form.Label>
                            <Form.Control as="select" name="userId" id="userId" value={editTask ? editTask.userId : ''} onChange={(e) => setEditTask({...editTask, userId: e.target.value})}>
                            <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user._id} value={user._id}>{user.username}</option>
                                ))}
                                </Form.Control>
                            </Form.Group>
                            <Button color="primary" type="submit">Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
           </>
        );
    };
    
    export default ShowTask;