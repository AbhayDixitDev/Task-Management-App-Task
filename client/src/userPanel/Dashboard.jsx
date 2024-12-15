import React, { useEffect } from 'react';
import TopMenu from './components/TopMenu';
import Sidemenu from './components/Sidemenu';
import { Outlet, Navigate } from 'react-router-dom';
import Footer from './components/Footer';

const Dashboard = () => {
   
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <TopMenu/>
            <div className="d-flex h-100" style={{height:'100vh'}}>
                <Sidemenu/>
                    <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
