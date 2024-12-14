import React from 'react';
import { Container, Navbar, Nav, NavLink } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

const AdminTopMenu = () => {
    const username = localStorage.getItem('username');
    const location = useLocation();
    return (
        <Navbar bg="black" style={{ fontSize: '1.2rem'}} variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/adminDashboard" style={{
                    fontFamily: 'Lobster, cursive',
                    color: '#ffa500',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        color: '#fff'
                    }}}>Welcome <span style={{color: '#fff',marginLeft: '5px',display: location.pathname !== '/adminDashboard/showTask' && location.pathname !== '/adminDashboard/ShowUsers' && location.pathname !== '/adminDashboard/createUser' && location.pathname !== '/adminDashboard/assignTask'? 'block' : 'none'}}>{username.toUpperCase()},</span> to Admin Panel of Task Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink style={{fontFamily: 'Lobster, cursive', color: '#ffa500'}} onClick={() => {
                            localStorage.removeItem('access_token');
                            window.location.href = '/';
                        }}>Logout <FaPowerOff style={{display: 'inline-block', marginLeft: '5px', color: '#ffa500'}}/></NavLink>
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default AdminTopMenu;
