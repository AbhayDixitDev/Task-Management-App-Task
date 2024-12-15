import { FaTasks, FaUserPlus } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import {  Nav, Navbar } from 'react-bootstrap';

const Sidemenu = () => {

    return (
        <>
           
            <div className="admin-sidemenu" style={{ height: '82vh', width: '20vw', backgroundColor: '#212529 !important', color: '#fff', fontSize: '1.2rem', display: 'grid', placeItems: 'center' }}>
                <Navbar className="bg-black" style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
                    <Nav className="flex-column" style={{textAlign: 'center'}}>
                        <NavLink to="showUserTask" className="nav-link" activeClassName="active" style={{ color: '#fff' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem'}}>
                                <FaTasks className="mr-2" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                                Tasks
                            </div>
                        </NavLink>
                        <NavLink to="changePassword" className="nav-link" activeClassName="active" style={{ color: '#fff' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem'}}>
                                <FaUserPlus className="mr-2" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                                Change Password
                            </div>
                        </NavLink>
                    </Nav>
                </Navbar>
            </div>
        </>
    );
};

export default Sidemenu;
