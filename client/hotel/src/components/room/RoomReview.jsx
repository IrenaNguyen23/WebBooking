import { Avatar, Box, Grid, Rating } from '@mui/material';
import React, { useState } from 'react';

const RoomReview = ({ comment }) => {
    const [showModal, setShowModal] = useState(false);

    const userName = comment.userInfo.length > 0 ? `${comment.userInfo[0].firstName} ${comment.userInfo[0].lastName}` : 'Unknown User';
    const formattedDate = new Date(comment.createdDate).toLocaleString();

    // Tạo URL hình ảnh từ dữ liệu base64 nếu có
    const imageUrl = comment.photo ? `data:image/jpeg;base64,${comment.photo}` : null;

    const modalStyle = {
        display: showModal ? 'block' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1050,
        overflow: 'hidden'
    };

    const modalContentStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 'none'
    };

    return (
        <div>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                        <Avatar className='text-white' style={{ width: 56, height: 56, backgroundColor: "#9155fd" }}>
                            {userName.charAt(0)}
                        </Avatar>
                    </div>
                    <div className="col-md-11">
                        <div className="card-body">
                            <h5 className="card-title">{userName}</h5>
                            <h6 className="card-subtitle text-muted">{formattedDate}</h6>
                            <Rating value={comment.rating} name='half-rating' readOnly precision={0.5} className="mt-2" />
                            <p className="card-text mt-2">{comment.content}</p>
                            {imageUrl && 
                                <>
                                    <img src={imageUrl} alt="Comment" className="img-fluid rounded mt-3" style={{ maxWidth: '150px', cursor: 'pointer' }} onClick={() => setShowModal(true)} />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {showModal && 
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050, overflow: 'auto' }} onClick={() => setShowModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" style={{ marginTop: '100px' }}>
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src={imageUrl} alt="Comment Full Size" className="img-fluid" style={{ maxWidth: '100%', maxHeight: '80vh', margin: '0 auto', display: 'block' }} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default RoomReview;
