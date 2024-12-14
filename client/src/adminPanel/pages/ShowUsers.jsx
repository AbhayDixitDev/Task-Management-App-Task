import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [lastPage, setLastPage] = useState(false);
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/users/all');
            setUsers(response.data);
            setLastPage(response.data.length / usersPerPage < currentPage);
        }
        fetchUsers();
    }, [currentPage, usersPerPage]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Container>
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <CardTitle>Users</CardTitle>
                            <Table striped bordered hover responsive className="table-dark">
                                <thead className="bg-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={index} className="bg-dark">
                                            <th scope="row" className="px-6 py-4 font-medium text-white">{index + 1}</th>
                                            <td className="px-6 py-4 text-white">{user.name}</td>
                                            <td className="px-6 py-4 text-white">{user.username}</td>
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
                                    <PaginationLink previous onClick={() => paginate(currentPage - 1)}>
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink>
                                        {currentPage}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink next onClick={() => paginate(currentPage + 1)} disabled={lastPage}>
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last onClick={() => paginate(Math.ceil(users.length / usersPerPage))} disabled={lastPage}>
                                        Last
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowUsers;
