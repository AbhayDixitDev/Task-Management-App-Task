import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import Darkmode from 'darkmode-js';
import { bottom } from '@popperjs/core';
import axios from 'axios';
import message from 'antd/lib/message';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUser, setIsUser] = useState(true);


    const handleToggle = () => setIsUser(prevState => !prevState);

    const usernamePlaceholder = isUser ? 'Enter your username' : 'Enter your admin username';
    const passwordPlaceholder = isUser ? 'Enter your password' : 'Enter your admin password';
    const buttonText = isUser ? 'Login as User' : 'Login as Admin';

    useEffect(() => {
      const options = {
        marginTop: '32px',
        top: '32px',
        bottom: 'unset',
        right: '32px',
        left: 'unset',
        time: '0.5s',
        mixColor: '#fff',
        backgroundColor: '#fff',
        buttonColorDark: '#fffc',
        buttonColorLight: '#000',
        saveInCookies: false,
        label: '🌜',
        toggleButton: true,
        autoMatchOsTheme: true
      };
       
      const darkmode = new Darkmode(options);
      darkmode.showWidget();
    }, []);
      

    const userLogin = (username, password) => {
        console.log(`User login: ${username}, ${password}`);
        const api="http://localhost:5000/api/users/login"
        axios.post(api,{username,password})
        .then(res=>{
            console.log(res)
            message.success('Login successful')
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    };

    const adminLogin = (username, password) => {
        console.log(`Admin login: ${username}, ${password}`);
        const api="http://localhost:5000/api/admin/login"
        axios.post(api,{username,password})
        .then(res=>{
            message.success('Login successful')
            navigate('/adminDashboard')
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <header className="bg-dark text-white p-3 d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(to right, #000, #222)', fontFamily: 'FancyFont' }}>
                <h1 className="display-4 mr-3">Task Management App</h1>
                <FaUser size={30} /> &nbsp; &nbsp;
                <FaLock size={30} />
              
            </header>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md="4" className="d-flex align-items-center">
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            if (isUser) {
                                userLogin(username, password);
                            } else {
                                adminLogin(username, password);
                            }
                        }} className="shadow-lg p-5 mb-5 w-100 bg-white rounded m-auto" >
                            <FormGroup>
                                <Label for="username" className="d-flex align-items-center">
                                    <FaUser className="mr-2" />
                                    Username
                                </Label>
                                <Input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={usernamePlaceholder}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password" className="d-flex align-items-center">
                                    <FaLock className="mr-2" />
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={passwordPlaceholder}
                                />
                            </FormGroup>
                            <Button color="dark" block className="my-2" onClick={handleToggle}>
                                {isUser ? 'Switch to Admin' : 'Switch to User'}
                            </Button>
                            <Button color="danger" block className="mt-3" >
                                {buttonText}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <footer className="bg-dark text-white p-3 text-center" style={{ marginTop: 'auto' }}>
                <p>&copy; 2023 Abhay Dixit</p>
            </footer>
        </div>
    );
};

export default Login;
