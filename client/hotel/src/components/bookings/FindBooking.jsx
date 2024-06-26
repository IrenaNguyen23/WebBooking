import React, { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"
import { Backdrop, CircularProgress } from "@mui/material"

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestFullname: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuest: ""
	})

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestFullname: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuest: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBookingInfo(data)
			setError(null)
		} catch (error) {
			setBookingInfo(emptyBookingInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError("Not Found Booking Info with Confirmation Code:" + confirmationCode)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}
	console.log(bookingInfo)
	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.bookingId)
			setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
			setBookingInfo(emptyBookingInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">Find My Booking</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
							Find booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<>
						<Backdrop
						sx={{
							color: '#fff',
							zIndex: (theme) => theme.zIndex.drawer + 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}
						open={isLoading}
					>
						<CircularProgress color="inherit" />
						<h5 style={{ marginTop: '16px' }}>Find your booking...</h5>
					</Backdrop>
					</>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? (
					<div className="container text-center my-3">
						<h3>Booking Information</h3>
						<div className="card">
							<div className="card-body">
								<p className="card-text text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
								<p className="card-text">Room Number: {bookingInfo.room.id}</p>
								<p className="card-text">Room Type: {bookingInfo.room.roomType}</p>
								<p className="card-text">Check-in Date: {moment(bookingInfo.checkIndate).subtract(1, "month").format("MMM Do, YYYY")}</p>
								<p className="card-text">Check-out Date: {moment(bookingInfo.checkOutdate).subtract(1, "month").format("MMM Do, YYYY")}</p>
								<p className="card-text">Full Name: {bookingInfo.guestFullname}</p>
								<p className="card-text">Email Address: {bookingInfo.guestEmail}</p>
								<p className="card-text">Adults: {bookingInfo.numOfAdults}</p>
								<p className="card-text">Children: {bookingInfo.numOfChildren}</p>
								<p className="card-text">Total Guest: {bookingInfo.totalNumOfGuest}</p>

								{!isDeleted && (
									<button
										onClick={() => handleBookingCancellation(bookingInfo.id)}
										className="btn btn-danger mt-3">
										Cancel Booking
									</button>
								)}
							</div>
						</div>
					</div>
				) : (
					<div>find booking...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	)
}

export default FindBooking