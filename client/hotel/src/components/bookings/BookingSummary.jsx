
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }


    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])
    console.log(booking)

    return (
        <div className='card card-body mt-5'>
            <h4>Reservation Summary</h4>
            <p>FullName : <strong>{booking.guestFullName}</strong></p>
            <p>Email : <strong>{booking.guestEmail}</strong></p>
            <p>Check-In Date : <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
            <p>Check-Out Date : <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
            <p>Number Of Days : <strong>{numberOfDays}</strong></p>
            <div>
                <h5>Number of Guests:</h5>
                <strong>
                    Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
                </strong>
                <br />
                <strong>
                    Children : {booking.numOfChildren}
                </strong>
            </div>
            {payment > 0 ? (
                <>
                    <p>
                        Total Payment: <strong>${payment}</strong>
                    </p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button variant='success' onClick={handleConfirmBooking}>
                            {isProcessingPayment ? (
                                <>
                                    <span
                                        className='spinner-border spinner-border-sm mr-2'
                                        role='status'
                                        aria-hidden='true'
                                        aria-label='Loading'>
                                    </span>

                                    Booking Corfirmed, redirecting to payment ...
                                </>
                            ) : (
                                "Confirm Booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>
                                    Loading
                                </span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className='text-danger'>
                    Check-Out Date must be after check-In Date
                </p>
            )}
        </div>
    )
}

export default BookingSummary