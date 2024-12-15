import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Modal, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';

const ShowUserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');

    if (!token) {
        return <Navigate to="/" />
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/tasks/mytasks', { username });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, [username]);

    const updateStatus = async (taskId, status) => {
        const confirmUpdate = window.confirm(`Are you sure you want to change the status of task ${taskId} to ${status}?`);
        if (confirmUpdate) {
            try {
                const res = await axios.patch(`http://localhost:5000/api/tasks/${taskId}/status`, { status });
                setTasks(tasks.map(task => task._id === taskId ? { ...task, status } : task));
            } catch (error) {
                console.error("Error updating status:", error);
            }
        }
    }

    const handleView = (task) => {
        setSelectedTask(task);
        setModal(true);
    }

    const toggle = () => setModal(!modal);

    const getStatusColor = (task) => {
        if (task.status === 'complete') {
            return 'green';
        } else if (task.status === 'pending') {
            return 'yellow';
        } else if (new Date(task.dueDate) < new Date()) {
            return 'red';
        } else {
            return 'black';
        }
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tasks.slice(indexOfFirstItem, indexOfLastItem);

    const dueTasks = tasks.filter(task => new Date(task.dueDate) < new Date());

    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <Card className="shadow-sm">
                        <CardBody>
                            <CardTitle className="text-center">Task List</CardTitle>
                            <p className="text-center">You have {dueTasks.length} tasks due today</p>
                            <Table hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((task, index) => (
                                        <tr key={task._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.title}</td>
                                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                            <td>{task.priority}</td>
                                            <td style={{ color: getStatusColor(task) }}>{task.status}</td>
                                            <td>
                                                <Button color="primary" onClick={() => handleView(task)}>View</Button>
                                                <select onChange={(e) => updateStatus(task._id, e.target.value)} style={{ appearance: 'button', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '5px', margin: '5px' }}>
                                                      <option value="complete">Complete</option>
                                                      <option value="pending">Pending</option>
                                                      <option value="in-progress">In Progress</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination aria-label="Page navigation example" className="justify-content-center">
                                <PaginationItem>
                                    <PaginationLink first onClick={() => paginate(1)}>
                                        First
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink previous onClick={() => paginate(currentPage - 1)}>
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                {[...Array(Math.ceil(tasks.length / itemsPerPage)).keys()].map((i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink onClick={() => paginate(i + 1)}>
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink next onClick={() => paginate(currentPage + 1)}>
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last onClick={() => paginate(Math.ceil(tasks.length / itemsPerPage))}>
                                        Last
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle} style={{top:100}}>
                <ModalHeader toggle={toggle}>Task Details</ModalHeader>
                <ModalBody>
                    <p><strong>Title:</strong> {selectedTask && selectedTask.title}</p>
                    <p><strong>Description:</strong> {selectedTask && selectedTask.description}</p>
                    <p><strong>Due Date:</strong> {selectedTask && new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                    <p><strong>Priority:</strong> {selectedTask && selectedTask.priority}</p>
                    <p><strong>Status:</strong> {selectedTask && selectedTask.status}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default ShowUserTask;
