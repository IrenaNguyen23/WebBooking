import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRoutes from './components/router/CustomerRoutes';
import AdminRouters from './components/router/AdminRouters';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TokenExpiredAlert />
        <Routes>
          <Route path='/*' element={<CustomerRoutes />} />
          <Route path='/admin/*' element={<AdminRouters />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
const TokenExpiredAlert = () => {
  const { tokenExpiredAlert, handleTokenExpiredAlertClose } = useAuth();

  return (
    <>
      {tokenExpiredAlert && (
        <div className="token-expired-modal">
          <div className="token-expired-content">
            <p>Your session has expired. Please login again.</p>
            <button onClick={handleTokenExpiredAlertClose}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App
