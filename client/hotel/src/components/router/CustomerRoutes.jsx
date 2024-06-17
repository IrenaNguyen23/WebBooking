import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Home from '../home/Home';
import RequireAuth from '../auth/RequireAuth';
import CheckOut from '../bookings/CheckOut';
import RoomListing from '../room/RoomListing';
import RoomDetail from '../room/RoomDetail';
import BookingSuccess from '../bookings/BookingSuccess';
import Bookings from '../bookings/Bookings';
import FindBooking from '../bookings/FindBooking';
import Login from '../auth/Login';
import Registration from '../auth/Registration';
import Profile from '../auth/Profile';
import Footer from '../layout/Footer';
import ContactForm from '../contact/Contact';
import ExistingRoom from '../room/ExistingRoom';
const CustomerRoutes = () => {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactForm />} />
        <Route
          path="/book-room/:roomId"
          element={
            <RequireAuth>
              <CheckOut />
            </RequireAuth>
          }
        />
        <Route path='/existing-rooms' element={<ExistingRoom />} />
        <Route path='/browse-all-rooms' element={<RoomListing />} />
        <Route path='/room-detail/:roomId' element={<RoomDetail />} />
        <Route path='/booking-success' element={<BookingSuccess />} />
        <Route path='/existing-bookings' element={<Bookings />} />
        <Route path='/find-booking' element={<FindBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path='/logout' element={<FindBooking />} /> */}
      </Routes>
      <Footer />
    </main>
  )
}

export default CustomerRoutes