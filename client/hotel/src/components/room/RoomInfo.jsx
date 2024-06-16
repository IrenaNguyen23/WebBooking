import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faWifi, faWaterLadder, faSnowflake, faBellConcierge, faAngleDown, faCheck, faPersonBiking, faCreditCard, faCircleCheck, faVolumeHigh, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const RoomInfo = ({ room, data, gallery }) => {
    const defaultImage = 'https://th.bing.com/th/id/R.f4b66deaaa86e28f60f9c840815f36c6?rik=5LX3NDG%2fjPFapQ&pid=ImgRaw&r=0';

    return (
        <Container className="my-5">
            <Row>
                <Col md={8}>
                <Carousel>
                {(gallery && gallery.length > 0) ? (
                    gallery.map((gallery, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={`data:image/jpeg;base64,${gallery.image}`}
                                alt={`Slide ${index}`}
                                style={{ maxHeight: '500px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    ))
                ) : (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={defaultImage}
                            alt="No Image Available"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                )}
            </Carousel>
                </Col>
                <Col md={4}>
                    <h3>{data.roomType}</h3>
                    <p>{room.description}</p>
                    <h5>Details</h5>
                    <ul className="list-unstyled">
                        <li>Price per night: ${data.roomPrice}</li>
                        <li>Size: {room.size} sqm</li>
                        <li>Max Guests: {room.maxGuests}</li>
                        <li>Bed Type: {room.bedType}</li>
                    </ul>
                    <h5>Amenities</h5>
                    <ul className="list-unstyled">
                        {room.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                    <Link to={`/book-room/${data.id}`} className="btn btn-primary">Book Now</Link>
                </Col>
            </Row>
            <Row>
                <h1>About This Room</h1>
                <Col md={6}>
                    <div className="bg-transparent">
                        <div className="pt-4 p-0">
                            <h5 className="fw-light mb-4">Main Highlights</h5>
                            <div className="hstack gap-3 mb-3">
                                <div className="icon-lg bg-light h5 rounded-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Free wifi">
                                    <FontAwesomeIcon icon={faWifi} />
                                </div>
                                <div className="icon-lg bg-light h5 rounded-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Swimming Pool">
                                    <FontAwesomeIcon icon={faWaterLadder} />
                                </div>
                                <div className="icon-lg bg-light h5 rounded-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Central AC">
                                    <FontAwesomeIcon icon={faSnowflake} />
                                </div>
                                <div className="icon-lg bg-light h5 rounded-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Free Service">
                                    <FontAwesomeIcon icon={faBellConcierge} />
                                </div>
                            </div>
                            <p className="mb-3">
                                Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. <b>Bed one supposing breakfast day fulfilled off depending questions.</b>
                            </p>
                            <p className="mb-0">
                                Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Large above be to means. Dashwood does provide stronger is.
                            </p>
                            <div className="collapse show" id="collapseContent">
                                <p className="my-3">
                                    We focus a great deal on the understanding of behavioral psychology and influence triggers which are crucial for becoming a well rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isn't going to get the job done so that's why this rickets is packed with practical hands-on examples that you can follow step by step.
                                </p>
                                <p className="mb-0">
                                    Behavioral psychology and influence triggers which are crucial for becoming a well rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isn't going to get the job done so that's why this tickets is packed with practical hands-on examples that you can follow step by step.
                                </p>
                            </div>
                            <a className="p-0 mb-4 mt-2 btn-more d-flex align-items-center" data-bs-toggle="collapse" href="#collapseContent" role="button" aria-expanded="true" aria-controls="collapseContent">
                                See <span className="see-more ms-1">more</span><span className="see-less ms-1">less</span>
                                <FontAwesomeIcon icon={faAngleDown} className="ms-2" />
                            </a>
                            <h5 className="fw-light mb-2">Advantages</h5>
                            <ul className="list-group list-group-borderless mb-0">
                                <li className="list-group-item h6 fw-light d-flex mb-0">
                                    <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                    Every hotel staff to have Proper PPT kit for COVID-19
                                </li>
                                <li className="list-group-item h6 fw-light d-flex mb-0">
                                    <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                    Every staff member wears face masks and gloves at all service times.
                                </li>
                                <li className="list-group-item h6 fw-light d-flex mb-0">
                                    <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                    Hotel staff ensures to maintain social distancing at all times.
                                </li>
                                <li className="list-group-item h6 fw-light d-flex mb-0">
                                    <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                    The hotel has In-Room Dining options available
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <h1>Amenities</h1>
                    <div className=" bg-transparent">
                        <div className=" pt-4 p-0">
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <h6>
                                        <FontAwesomeIcon icon={faPersonBiking} className="mx-3" /> Activities
                                    </h6>
                                    <ul className="list-group list-group-borderless mt-2 mb-0">
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Swimming pool
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Spa
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Kids' play area
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Gym
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <h6>
                                        <FontAwesomeIcon icon={faCreditCard} className="mx-3" /> Payment Method
                                    </h6>
                                    <ul className="list-group list-group-borderless mt-2 mb-0">
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Credit card (Visa, Master card)
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Cash
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Debit Card
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row g-4 mt-3">
                                <div className="col-sm-6">
                                    <h6>
                                        <FontAwesomeIcon icon={faBellConcierge} className="mx-3" /> Services
                                    </h6>
                                    <ul className="list-group list-group-borderless mt-2 mb-0">
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Dry cleaning
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Room Service
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Special service
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Waiting Area
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Secrete smoking area
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Concierge
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Laundry facilities
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Ironing Service
                                        </li>
                                        <li className="list-group-item pb-0 border-0">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Lift
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <div className="row g-4">
                                        <h6>
                                            <FontAwesomeIcon icon={faShieldAlt} className="mx-3" /> Safety & Security
                                        </h6>
                                        <ul className="list-group list-group-borderless mt-2 mb-0 mx-2">
                                            <li className="list-group-item pb-0 border-0">
                                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Doctor on Call
                                            </li>
                                        </ul>
                                    </div>

                                    <div className='row g-4 mt-3'>
                                        <h6>
                                            <FontAwesomeIcon icon={faVolumeHigh} className="mx-3" /> Staff Language
                                        </h6>
                                        <ul className="list-group list-group-borderless mt-2 mb-0 mx-2">
                                            <li className="list-group-item pb-0 border-0">
                                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Spanish
                                            </li>
                                            <li className="list-group-item pb-0 border-0">
                                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> English
                                            </li>
                                            <li className="list-group-item pb-0 border-0">
                                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-1" /> Japan
                                            </li>
                                        </ul>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default RoomInfo