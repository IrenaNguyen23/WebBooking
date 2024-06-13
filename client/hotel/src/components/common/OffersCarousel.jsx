import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const OffersCarousel = () => {
    const offers = [
        {
            id: 1,
            photo: 'https://themes.coderthemes.com/booking_v/assets/05-B2U-hOtN.jpg',
            description:"2023 Golf Tournament Package",
            summer:"Valid through Jan 2022",
        },
        {
            id: 2,
            photo: 'https://themes.coderthemes.com/booking_v/assets/06-CZZeSF0k.jpg',
            description:"Spa Package Offer",
            summer:"Valid through Dec 2022",
        },
        {
            id: 3,
            photo: 'https://themes.coderthemes.com/booking_v/assets/08-DRfAndxw.jpg',
            description:"Elevate Your Stay",
            summer:"Valid through Feb 2022",
        },
        {
            id: 4,
            photo: 'https://themes.coderthemes.com/booking_v/assets/07-Bp_27LPp.jpg',
            description:"Pass Holder Package",
            summer:"Valid through Feb 2022",
        },
    ];
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
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
    <h1 className='text-bold text-center'>Special Offers</h1>
    <Carousel responsive={responsive} infinite={true} autoPlaySpeed={3000} itemClass="d-flex align-items-end">
            {offers.map((offer) => (
                <Col key={offer.id} className='mb-5' style={{ position: 'relative', paddingBottom: '50px' }}>
                    <Card className='mx-2'>
                        <Card.Img src={offer.photo} alt='Room Photo' className="card-img" style={{ borderRadius: "3px" }} />
                        <div className='position-absolute top-100 start-50 translate-middle w-100'>
                            <Card.Body className='text-center bg-mode shadow rounded mx-4 p-3' style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                                <Card.Title className='mb-1'>{offer.description}</Card.Title>
                                <small>{offer.summer}</small>
                                <div className='mt-2'>
                                    <Button className='btn-sm btn-dark mb-0'>View Offer</Button>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
            ))}
        </Carousel>
    </>
  )
}

export default OffersCarousel