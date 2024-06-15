import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '../admin/Admin';
import NavBar from '../layout/NavBar';
const AdminRouters = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/*' element={<Admin />} />
            </Routes>
        </div>
    )
}

export default AdminRouters