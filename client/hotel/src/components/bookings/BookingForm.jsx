import React from 'react'
import { useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { Form } from 'react-bootstrap'
import BookingSummary from './BookingSummary'

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const currentUser = localStorage.getItem("userId")

    const [roomPrice, setRoomPrice] = useState(0)
    const { roomId } = useParams()
    const navigate = useNavigate()

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const paymentPerDay = roomPrice ? roomPrice : 0
        return diffInDays * paymentPerDay
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            setErrorMessage(error.message)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }

    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h4 className='card card-title'>
                                Reserve Room
                            </h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor='guestFullName'>
                                        Full Name :
                                    </Form.Label>

                                    <Form.Control
                                        required type='text'
                                        id="guestFullName" name='guestFullName'
                                        value={booking.guestFullName}
                                        placeholder='Enter your full name'
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type='invalid'> Plese enter your fullname </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor='guestEmail'>
                                        Email :
                                    </Form.Label>

                                    <Form.Control
                                        required type='email'
                                        id="guestEmail" name='guestEmail'
                                        value={booking.guestEmail}
                                        placeholder='Enter your email'
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type='invalid'> Plese enter your email address </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>
                                        Loading period
                                    </legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='checkInDate'>
                                                Check-In Date :
                                            </Form.Label>

                                            <Form.Control
                                                required type='date'
                                                id="checkInDate" name='checkInDate'
                                                value={booking.checkInDate}
                                                placeholder='Check In Date'
                                                onChange={handleInputChange} />
                                            <Form.Control.Feedback type='invalid'> Plese select a check in date </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor='checkOutDate'>
                                                Check-Out Date :
                                            </Form.Label>

                                            <Form.Control
                                                required type='date'
                                                id="checkOutDate" name='checkOutDate'
                                                value={booking.checkOutDate}
                                                placeholder='Check Out Date'
                                                onChange={handleInputChange} />
                                            <Form.Control.Feedback type='invalid'> Plese select a check out date </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guest</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='numOfAdults'>
                                                Adults :
                                            </Form.Label>
                                            <Form.Control
                                                required type='number'
                                                id="numOfAdults" name='numOfAdults'
                                                value={booking.numOfAdults}
                                                placeholder='0'
                                                min={1}
                                                onChange={handleInputChange} />
                                            <Form.Control.Feedback type='invalid'> Plese select at least 1 adult. </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor='numOfChildren'>
                                                Children :
                                            </Form.Label>
                                            <Form.Control
                                                required type='number'
                                                id="numOfChildren" name='numOfChildren'
                                                value={booking.numOfChildren}
                                                placeholder='0'
                                                onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </fieldset>
                                <div className='form-group mt-2 mb-2'>
                                    <button className='btn btn-hotel' type='submit'>Continue</button>
                                </div>
                            </Form>
                        </div>

                    </div>
                    <div className='col-md-6'>
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking} />
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}

export default BookingForm