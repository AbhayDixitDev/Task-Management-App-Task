import React, { useEffect } from 'react';
import AdminTopMenu from './components/AdminTopMenu';
import AdminSidemenu from './components/AdminSidemenu';
import { Outlet, Navigate } from 'react-router-dom';
import AdminFooter from './components/AdminFooter';

const AdminDashboard = () => {
   
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <AdminTopMenu/>
            <div className="d-flex h-100" style={{height:'100vh'}}>
                <AdminSidemenu/>
                    <Outlet/>
            </div>
            <AdminFooter/>
        </div>
    );
};

export default AdminDashboard;
