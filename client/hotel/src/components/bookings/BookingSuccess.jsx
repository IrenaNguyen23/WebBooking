import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error
    return (
        <div className='container'>
            <Header title="Booking Success" />
            <div className='mt-5'>
                {message ? (
                    <div>
                        <h3 className='text-success'> Booking Success !</h3>
                        <p className='text-success'> {message}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className='text-danger'> Error Booking Room !</h3>
                        <p className='text-success'>The room you selected has been booked. Please choose another room again. The money will be refunded to the account where you paid! </p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default BookingSuccess