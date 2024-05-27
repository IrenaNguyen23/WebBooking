import { parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (starDate, endDate) => {
        let filtered = bookingInfo
        if (starDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStarDate = parseISO(booking.checkIndate)
                const bookingEndDate = parseISO(booking.checkOutdate)
                return bookingStarDate >= starDate && bookingEndDate
                    <= endDate && bookingEndDate > starDate
            })
        }
        setFilteredBookings(filtered)
    }
    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkIndate}</td>
                            <td>{booking.checkOutdate}</td>
                            <td>{booking.guestFullname}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button className='btn btn-danger btn-sm'
                                    onClick={() => handleBookingCancellation(booking.id)}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filterBookings.length === 0 && <p>No Booking Found For Selected Date</p>}

        </section>
    )
}

export default BookingsTable