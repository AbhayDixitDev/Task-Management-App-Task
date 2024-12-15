import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import the trash icon from react-icons

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);
    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('access_token');

    if (!token) {
        return <Navigate to="/" />
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/users/all');
            setUsers(response.data);
        }
        fetchUsers();
    }, []);

    const indexOfLastUser  = currentPage * usersPerPage;
    const indexOfFirstUser  = indexOfLastUser  - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser , indexOfLastUser );

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = (userId) => {
        const confirm = window.confirm('Are you sure you want to delete this user?');
        if (confirm) {
            const api = `http://localhost:5000/api/users/${userId}`;
            axios.delete(api)
                .then(res => {
                    setUsers(users.filter(user => user._id !== userId)); // Update the state to remove the deleted user
                })
                .catch(err => console.log(err));
        }
    }

    const editUser = (id) => {
        const user = users.find(user => user._id === id);
        setUserId(id);
        setName(user.name);
        setUsername(user.username);
        setPassword(user.password);
        setModal(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, { name, username, password });
            const newUsers = await axios.get('http://localhost:5000/api/users/all');
            setUsers(newUsers.data); // Update the state to update the user
            setModal(false);
            

        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Users</CardTitle>
                            <Table striped bordered hover responsive className="table-black">
                                <thead className="bg-black" >
                                    <tr >
                                        <th style={{color: '#fff'}}>#</th>
                                        <th style={{color: '#fff'}}>Name</th>
                                        <th style={{color: '#fff'}}>Username</th>
                                        <th style={{color: '#fff'}}>Actions</th> {/* Add Actions column */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user._id} className="bg-black" style={{backgroundColor: 'black !important'}}>
                                            <th scope="row" className="px-6 py-4 font-medium text-white">{index + 1}</th>
                                            <td className="px-6 py-4 text-white">{user.name}</td>
                                            <td className="px-6 py-4 text-white">{user.username}</td>
                                            <td className="px-6 py-4" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Button color="danger" className="mx-1" onClick={() => handleDelete(user._id)}>
                                                    <FaTrash /> {/* Use the trash icon */}
                                                </Button>
                                                <Button color="primary" className="mx-1" onClick={()=> editUser(user._id)}>
                                                   <FaEdit />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination className="mt-3">
                                <PaginationItem>
                                    <PaginationLink first onClick={() => paginate(1)}>
                                        First
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink previous onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink>
                                        {currentPage}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink next onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser  >= users.length}>
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last onClick={() => paginate(Math.ceil(users.length / usersPerPage))} disabled={indexOfLastUser  >= users.length}>
                                        Last
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Edit User</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <Button type="submit" color="primary">Update</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default ShowUsers;