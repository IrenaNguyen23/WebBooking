
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    // const handleConfirmBooking = () => {
    //     setIsProcessingPayment(true)
    //     setTimeout(() => {
    //         setIsProcessingPayment(false)
    //         setIsBookingConfirmed(true)
    //         onConfirm()
    //     }, 3000)
    // }

    const handleApprove = (data, actions) => {
        return actions.order.capture().then(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        })
    }


    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])



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
                        <PayPalScriptProvider options={{ "client-id": "AdwDrwu8oq4HnMX3qYyZtDxSDSXCl-HlxEqV4U4Lp5fBwX3fV4unuh1PI3alPpXM_5xGoR-AW2zttsOg" }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: payment.toString(),
                                            },
                                        }],
                                    })
                                }}
                                onApprove={handleApprove}
                                onError={(err) => {
                                    console.error("PayPal Checkout onError", err)
                                    setIsProcessingPayment(false)
                                }}
                                onClick={() => {
                                    setIsProcessingPayment(true)
                                }}
                            />
                        </PayPalScriptProvider>
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