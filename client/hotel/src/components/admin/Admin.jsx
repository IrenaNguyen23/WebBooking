import React, { useState } from 'react';
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashBoard from './Components/DashBoard';
import ExistingRoom from '../room/ExistingRoom';
import Bookings from '../bookings/Bookings';
import EditRoom from '../room/EditRoom';
import Guest from './Components/Guest';
import Review from './Components/Review';

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Room", path: "/admin/room", icon: <DashboardIcon /> },
  { name: "Booking", path: "/admin/booking", icon: <DashboardIcon /> },
  { name: "Guest", path: "/admin/guest", icon: <DashboardIcon /> },
  { name: "Review", path: "/admin/review", icon: <DashboardIcon /> }

]

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

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
  const [sideBarVisible, setSideBarVisible] = useState(false)
  const navigation = useNavigate()

  const drawer = (
    <Box
      sx={{
        overflow: "auth",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height:"100%"
      }}>
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => <ListItem key={item.name} disablePadding onClick={() => navigation(item.path)}>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </ListItemButton>
        </ListItem>)}
      </List>
    </Box>
  )
  return (
    // <section className='container mt-5'>
    //   <h2>Welcome to Admin Panel</h2>
    //   <hr />
    //   <Link to={"/existing-rooms"}>Manage Rooms</Link> <br />
    //   <Link to={"/existing-bookings"}>Manage Bookings</Link> <br />
    //   <Link to="/logout">Logout</Link> {/* Đường dẫn đến trang đăng xuất */}
    // </section>
    <div>
      <div className='d-flex vh-100' >
        <CssBaseline />
        <div className='w-15 border-end border-gray h-100'
        >
          {drawer}
        </div>
        <Box className="adminContainer" component={"main"} sx={{flexGrow:1}}>
          <Routes>
            <Route path='/' element={<DashBoard/>}></Route>
            <Route path='/room' element={<ExistingRoom/>}></Route>
            <Route path='/booking' element={<Bookings/>}></Route>
            <Route path='/edit-room/:roomId' element={<EditRoom />} />
            <Route path='/guest' element={<Guest/>}></Route>
            <Route path='/review' element={<Review/>}></Route>
          </Routes>
        </Box>

      </div>
    </div>
  );
}

export default Admin;
