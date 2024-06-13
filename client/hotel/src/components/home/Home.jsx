import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from "react-router-dom"
import MomentCarousel from '../common/MomentCarousel'
import OffersCarousel from '../common/OffersCarousel'

const Home = () => {
	const location = useLocation()

	const message = location.state && location.state.message
	//const currentUser = localStorage.getItem("userId")
	return (
		<section>
			{message && <p className="text-warning px-5">{message}</p>}
			{/* {currentUser && (
				<h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
			)} */}
			<MainHeader />
			<div className="container">
				<RoomSearch />
				<RoomCarousel />
				<OffersCarousel/>
				<RoomCarousel />
				<HotelService />
				<Parallax />
			</div>
				<MomentCarousel />
		</section>
	)
}

export default Home