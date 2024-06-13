import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '../admin/Admin';
import { AuthProvider } from '../auth/AuthProvider';
const AdminRouters = () => {
    return (
        <AuthProvider>
            <div>

                <Routes>
                    <Route path='/*' element={<Admin />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default AdminRouters