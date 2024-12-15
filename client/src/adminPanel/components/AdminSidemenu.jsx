import { FaTasks, FaUsers, FaUserPlus, FaClipboardList } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import {  Nav, Navbar } from 'react-bootstrap';

const AdminSidemenu = () => {

    return (
        <>
           
            <div className="admin-sidemenu" style={{ height: '82vh', width: '20vw', backgroundColor: '#212529 !important', color: '#fff', fontSize: '1.2rem', display: 'grid', placeItems: 'center' }}>
                <Navbar className="bg-black" style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
                    <Nav className="flex-column" style={{textAlign: 'center'}}>
                        <NavLink to="createUser" className="nav-link" activeClassName="active" style={{ color: '#fff' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem'}}>
                                <FaUserPlus className="mr-2" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                                Create User
                            </div>
                        </NavLink>
                        <NavLink to="assignTask" className="nav-link" activeClassName="active" style={{ color: '#fff' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem'}}>
                                <FaClipboardList className="mr-2" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                                Assign Task
                            </div>
                        </NavLink>
                        <NavLink to="showTask" className="nav-link" activeClassName="active" style={{ color: '#fff' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem'}}>
                                <FaTasks className="mr-2" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                                Tasks
                            </div>
                        </NavLink>
                        <NavLink to="ShowUsers" className="nav-link" activeClassName="active" style={{ color: '#fff' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem'}}>
                                <FaUsers className="mr-2" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                                Users
                            </div>
                        </NavLink>                       
                        
                    </Nav>
                </Navbar>
            </div>
        </>
    );
};

export default AdminSidemenu;
