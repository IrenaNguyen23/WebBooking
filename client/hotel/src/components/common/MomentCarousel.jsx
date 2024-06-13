import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MomentCarousel = () => {

    const moments = [
        {
            id: 1,
            photo: 'https://themes.coderthemes.com/booking_v/assets/02-DnFcjubc.jpg',
        },
        {
            id: 2,
            photo: 'https://themes.coderthemes.com/booking_v/assets/03-ByuRxZIQ.jpg',
        },
        {
            id: 3,
            photo: 'https://themes.coderthemes.com/booking_v/assets/04-nYNDzOgK.jpg',
        },
        {
            id: 4,
            photo: 'https://themes.coderthemes.com/booking_v/assets/05-QN1F1kAE.jpg',
        },
        {
            id: 5,
            photo: 'https://themes.coderthemes.com/booking_v/assets/06-CPwyf5O2.jpg',
        },
        {
            id: 6,
            photo: 'https://themes.coderthemes.com/booking_v/assets/07-U9Ezn64W.jpg',
        },
        {
            id: 7,
            photo: 'https://themes.coderthemes.com/booking_v/assets/08-CVVeZvvJ.jpg',
        },
        {
            id: 8,
            photo: 'https://themes.coderthemes.com/booking_v/assets/01-JM4nio3c.jpg',
        },
    ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <h1 className='text-center'>Our Hotel Precious Moments</h1>
            <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} itemClass="d-flex align-items-end">
                {moments.map((moment) => (
                    <Col key={moment.id} className='mb-4 d-flex justify-content-center align-items-end'>
                        <Card className='mx-2'>
                            <Card.Img src={moment.photo} alt='Room Photo' style={{borderRadius:"3px"}} />
                        </Card>
                    </Col>
                ))}
            </Carousel>
        </>
    );
};

export default MomentCarousel;
