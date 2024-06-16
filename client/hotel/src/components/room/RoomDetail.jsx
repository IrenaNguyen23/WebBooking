import { Box, Grid, LinearProgress, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RoomReview from './RoomReview'
import CommentForm from "../common/CommentForm";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import { getRoomById, getUser, getCommentByRoomId, deleteComment } from '../utils/ApiFunctions'
import CommentEdit from '../common/CommentEdit';
import RoomInfo from './RoomInfo';
import { Col, Row } from 'react-bootstrap';

const RoomDetail = () => {
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [room, setRoom] = useState([]);
    const [user, setUser] = useState([]);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [showLessComments, setShowLessComments] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null); // State để xác định trạng thái menu dropdown
    const [editingComment, setEditingComment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [galleries,setGalleries] =useState([]);


    const { roomId } = useParams();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const commentData = await getCommentByRoomId(roomId);
                setComments(commentData);
                if (commentData.length > 0) {
                    const totalRating = commentData.reduce((sum, comment) => sum + comment.rating, 0);
                    const avgRating = totalRating / commentData.length;
                    setAverageRating(avgRating);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchComment();
    }, [roomId]);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setGalleries(roomData.galleries);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRoom();
    }, [roomId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [userId, token]);

    const fetchComment = async () => {
        try {
            const commentData = await getCommentByRoomId(roomId);
            setComments(commentData);
            if (commentData.length > 0) {
                const totalRating = commentData.reduce((sum, comment) => sum + comment.rating, 0);
                const avgRating = totalRating / commentData.length;
                setAverageRating(avgRating);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleShowMoreComments = () => {
        setShowMoreComments(true);
        setShowLessComments(true);
    };

    const handleShowLessComments = () => {
        setShowMoreComments(false);
        setShowLessComments(false);
    };

    const handleEditComment = (commentId) => {
        const commentToEdit = comments.find(comment => comment.id === commentId);
        if (commentToEdit) {
            setEditingComment(commentToEdit);
            setIsEditing(true);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const result = await deleteComment(commentId, userId);
            if (result === "Comment deleted successfully") {
                console.log("Xóa thành công comment có id:", commentId);
                fetchComment(); // Gọi lại hàm fetchComment để cập nhật danh sách comment sau khi xóa
            } else {
                console.error(`Lỗi xóa comment: ${result}`);
                console.log("ID của comment gây lỗi:", commentId);
            }
        } catch (error) {
            console.error("Lỗi xóa comment:", error.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingComment(null);
        setIsEditing(false);
    };

    const handleCommentUpdateSuccess = () => {
        setIsEditing(false);
    };

    const calculatePercentage = (ratingValue) => {
        if (comments.length === 0) return 0;
        const count = comments.filter(comment => comment.rating === ratingValue).length;
        return (count / comments.length) * 100;
    };
    const sampleRoom = {
        name: 'Deluxe Room',
        description: 'A luxurious room with a beautiful view.',
        price: 150,
        size: 35,
        maxGuests: 2,
        bedType: 'King Size',
        images: [
            'https://themes.coderthemes.com/booking_v/assets/14-BaEyLBys.jpg',
            'https://themes.coderthemes.com/booking_v/assets/13-CxdoJILa.jpg',
            'https://themes.coderthemes.com/booking_v/assets/12-Ck9qKKLH.jpg'
        ],
        amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Mini Bar'],
        reviews: [
            { user: 'John Doe', comment: 'Great stay, very comfortable!' },
            { user: 'Jane Smith', comment: 'Amazing view and friendly staff.' }
        ]
    };
    return (
        <section className='container'>
            <RoomInfo room={sampleRoom} data={room} gallery={galleries} />
            <h1 className='font-semibold text-lg pb-4'>Recent Review & Rating</h1>
            <div className='border my-4 p-5'>
                <Row>
                    <Col>
                        <h1 className='font-semibold text-lg pb-2'>{averageRating.toFixed(1)}</h1>
                        <p>Based on {comments.length} Reviews</p>
                        <Rating value={averageRating.toFixed(1)} readOnly precision={0.5} />
                    </Col>
                    <Col>
                        <Box className="mt-5 space-y-3">
                            <div className="linear-progress-container">
                                <Row className="align-items-center">
                                    <Col xs={9}>
                                        <LinearProgress
                                            style={{ borderRadius: '4px', height: '7px' }}
                                            variant='determinate'
                                            value={calculatePercentage(5)}
                                            color='success'
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <span className="linear-progress-percentage">{calculatePercentage(5).toFixed(0)}%</span>
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col xs={9}>
                                        <LinearProgress
                                            style={{ borderRadius: '4px', height: '7px' }}
                                            variant='determinate'
                                            value={calculatePercentage(4)}
                                            color='primary'
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <span className="linear-progress-percentage">{calculatePercentage(4).toFixed(0)}%</span>
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col xs={9}>
                                        <LinearProgress
                                            style={{ borderRadius: '4px', height: '7px' }}
                                            variant='determinate'
                                            value={calculatePercentage(3)}
                                            color='secondary'
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <span className="linear-progress-percentage">{calculatePercentage(3).toFixed(0)}%</span>
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col xs={9}>
                                        <LinearProgress
                                            style={{ borderRadius: '4px', height: '7px' }}
                                            variant='determinate'
                                            value={calculatePercentage(2)}
                                            color='warning'
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <span className="linear-progress-percentage">{calculatePercentage(2).toFixed(0)}%</span>
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col xs={9}>
                                        <LinearProgress
                                            style={{ borderRadius: '4px', height: '7px' }}
                                            variant='determinate'
                                            value={calculatePercentage(1)}
                                            color='error'
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <span className="linear-progress-percentage">{calculatePercentage(1).toFixed(0)}%</span>
                                    </Col>
                                </Row>
                            </div>
                        </Box>
                    </Col>
                </Row>
            </div>
            <div className='border p-5'>
                <Grid container spacing={3}>
                    {comments.map((comment) => (
                        <Grid item xs={12} key={comment.id}>
                            {isEditing && editingComment && editingComment.id === comment.id ? (
                                <CommentEdit
                                    fetchComment={fetchComment}
                                    comment={editingComment}
                                    onCommentUpdateSuccess={handleCommentUpdateSuccess}
                                    onCancelEdit={handleCancelEdit}
                                />
                            ) : (
                                <>
                                    <RoomReview comment={comment} />
                                    {user.id === comment.userId && (
                                        <div className="dropdown">
                                            <button className="dropbtn" onClick={() => setMenuOpen(menuOpen === comment.id ? null : comment.id)}>...</button>
                                            {menuOpen === comment.id && (
                                                <div className="dropdown-content">
                                                    <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </Grid>
                    ))}
                </Grid>
                {/* Hiển thị nút "Xem thêm" nếu có nhiều hơn 5 bình luận và chưa bấm vào nút "Xem thêm" */}
                {comments.length > 5 && !showMoreComments && (
                    <div className="text-center my-4">
                        <button className="btn btn-secondary" onClick={handleShowMoreComments}><FaAnglesDown /> Xem thêm</button>
                    </div>
                )}
                {/* Hiển thị nút "Ẩn bớt" nếu đã bấm vào nút "Xem thêm" */}
                {showLessComments && (
                    <div className="text-center my-5">
                        <button className="btn btn-secondary" onClick={handleShowLessComments}><FaAnglesUp /> Ẩn bớt</button>
                    </div>
                )}
                {/* Hiển thị form comment nếu đã đăng nhập */}
                {user.id && (
                    <CommentForm userId={user.id} roomId={roomId} fetchComment={fetchComment} />
                )}
            </div>
        </section>
    );
};

export default RoomDetail