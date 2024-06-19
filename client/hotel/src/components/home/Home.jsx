import React, { useEffect, useState } from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from "react-router-dom"
import MomentCarousel from '../common/MomentCarousel'
import OffersCarousel from '../common/OffersCarousel'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Home = () => {
	const location = useLocation()

	const [message, setMessage] = useState(location.state && location.state.message);

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage('');
			}, 3000); // 10000ms = 10 giây

			return () => clearTimeout(timer); // Dọn dẹp bộ đếm giờ khi component bị unmount hoặc khi effect chạy lại
		}
	}, [message]);
	return (
		<section>
			{message && <Alert className='text-center' icon={<CheckIcon fontSize="inherit" />} severity="success">
				{message}
			</Alert>}
			<MainHeader />
			<div className="container">
				<RoomSearch />
				<RoomCarousel />
				<OffersCarousel />
				<HotelService />
				<Parallax />
			</div>
			<MomentCarousel />
		</section>
	)
}

export default Home