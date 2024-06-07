import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RoomReview from './RoomReview'
import CommentForm from "../common/CommentForm";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import { getRoomById, getUser, getCommentByRoomId, deleteComment } from '../utils/ApiFunctions'
import CommentEdit from '../common/CommentEdit';

const RoomDetail = () => {
    const [comments, setComments] = useState([]);
    const [room, setRoom] = useState({ id: "", roomType: "", roomPrice: "" });
    const [user, setUser] = useState([]);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [showLessComments, setShowLessComments] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null); // State để xác định trạng thái menu dropdown
    const [editingComment, setEditingComment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { roomId } = useParams();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const commentData = await getCommentByRoomId(roomId);
                setComments(commentData);
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

    return (
        <section className='container'>
            <h1 className='font-semibold text-lg pb-4'>Recent Review & Rating</h1>
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