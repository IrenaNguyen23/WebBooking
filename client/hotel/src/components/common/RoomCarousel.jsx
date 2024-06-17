import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap'

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: "" }])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            const sortedRooms = data.sort((a, b) => b.bookings.length - a.bookings.length);
            const topRooms = sortedRooms.slice(0,8);
            setRooms(topRooms)
            setIsLoading(false)
        }).catch((error) => {
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])
    if (isLoading) {
        return <div className='mt-5'>Loading Rooms...</div>
    }
    if (errorMessage) {
        return <div className='text-danger mb-5 mt-5'>Error : {errorMessage}</div>
    }

    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <Container>
                <h1 className='text-center'>Featured Hotels</h1>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className='mb-4' xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/room-detail/${room.id}`} >
                                                <Card.Img variant='top'
                                                    src={`data:image/png;base64,${room.photo}`}
                                                    alt='Room Photo'
                                                    className='w-100'
                                                    style={{ height: "300px" }} />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className='hotel-color'>{room.name}</Card.Title>
                                                <Card.Subtitle className='my-2'>{room.roomType}</Card.Subtitle>
                                                <Card.Title className='room-price'>${room.roomPrice} / Night</Card.Title>
                                                <div className='flex-shrink-0 mt-3'>
                                                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Link to={"/browse-all-rooms"} className='hotel-color text-center ' style={{ display: 'block', width: '200px', margin: '0 auto' }}>
                    <span>View All Rooms</span>
                </Link>
            </Container>
        </section>
    )
}

export default RoomCarousel