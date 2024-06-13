import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRoutes from './components/router/CustomerRoutes';
import AdminRouters from './components/router/AdminRouters';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<CustomerRoutes />} />
        <Route path='/admin/*' element={<AdminRouters />} />
      </Routes>
    </Router>
  )
}

export default App
