import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelService = () => {
    return (
        <>
            <Container className='mb-2 '>
                <Header title={"Our Services"} />
                <Row>
                    <h4 className='text-center'>
                        Service at <span className='hotel-color'>Irena - </span> Hotel
                        <span className='gap-2'>
                            <FaClock />  -  24- Hours Front Desk
                        </span>
                    </h4>
                </Row>
                <hr />
                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    {[{
                        icon: <FaWifi />,
                        title: 'Wifi',
                        text: 'Stay connected with high-speed internet access.'
                    }, {
                        icon: <FaUtensils />,
                        title: 'Breakfast',
                        text: 'Start your day with a delicious breakfast buffet.'
                    }, {
                        icon: <FaTshirt />,
                        title: 'Laundry',
                        text: 'Keep your clothes clean and fresh with our laundry service.'
                    }, {
                        icon: <FaCocktail />,
                        title: 'Mini-Bar',
                        text: 'Enjoy a refreshing drink or snack from our in-room mini-bar.'
                    }, {
                        icon: <FaParking />,
                        title: 'Parking',
                        text: 'Park your car conveniently in our on-site parking lot.'
                    }, {
                        icon: <FaSnowflake />,
                        title: 'Air Conditioning',
                        text: 'Stay cool and comfortable with our air conditioning system.'
                    }].map((service, index) => (
                        <Col key={index} className='d-flex align-items-stretch'>
                            <Card className='flex-fill'>
                                <Card.Body>
                                    <Card.Title className='hotel-color'>
                                        {service.icon} {service.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {service.text}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <hr />
        </>
    )
}

export default HotelService