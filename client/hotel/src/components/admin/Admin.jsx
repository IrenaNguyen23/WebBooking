import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")
  // Kiểm tra quyền truy cập
  if (!isLoggedIn || userRole !== "ROLE_ADMIN") {
    return (
      <section className='container mt-5'>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <Link to="/">Go to Home</Link>
      </section>
    );
  }

  // Nếu có quyền truy cập, hiển thị giao diện quản trị
  return (
    <section className='container mt-5'>
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <Link to={"/existing-rooms"}>Manage Rooms</Link> <br />
      <Link to={"/existing-bookings"}>Manage Bookings</Link> <br />
      <Link to="/logout">Logout</Link> {/* Đường dẫn đến trang đăng xuất */}
    </section>
  );
}

export default Admin;
