import { Avatar, Box, LinearProgress, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteCommentByAdmin, getAllComments } from '../../utils/ApiFunctions';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Review = () => {
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    fetchComment();
  }, []);

  const fetchComment = async () => {
    try {
      const commentData = await getAllComments()
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

  const calculatePercentage = (ratingValue) => {
    if (comments.length === 0) return 0;
    const count = comments.filter(comment => comment.rating === ratingValue).length;
    return (count / comments.length) * 100;
  };

  const handleDelete = async (commentId) => {
    try {
      const result = await deleteCommentByAdmin(commentId);
      if (result === "Comment deleted successfully") {
        console.log("Xóa thành công comment có id:", commentId);
        fetchComment(); // Gọi lại hàm fetchComment để cập nhật danh sách comment sau khi xóa
      } else {
        console.error(`Lỗi xóa comment: ${result}`);
        console.log("ID của comment gây lỗi:", commentId);
      }
    } catch (error) {
      console.error("Lỗi xóa comment:", error.message);
    } finally {
      setShowModal(false); // Đóng modal sau khi xóa xong (hoặc có lỗi)
    }
  };
  return (
    <div>
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
      {comments.map((comment) => {
        const userName = comment.userInfo && comment.userInfo.length > 0 ? `${comment.userInfo[0].firstName} ${comment.userInfo[0].lastName}` : 'Unknown User';
        const formattedDate = new Date(comment.createdDate).toLocaleString();
        return (
          <div className="card mb-3" key={comment.id}>
            <div className="row g-0">
              <div className="col-md-1 d-flex align-items-center justify-content-center">
                <Avatar className='text-white' style={{ width: 56, height: 56, backgroundColor: "#9155fd" }}>
                  {userName.charAt(0)}
                </Avatar>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-center">
                <h5 className="card-title">{userName}</h5>
                <h6 className="card-subtitle text-muted">{formattedDate}</h6>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <Rating value={comment.rating} name='half-rating' readOnly precision={0.5} />
                  <p className="card-text">Review on room: <strong>{comment.roomInfo[0].roomType}</strong></p>
                  <button className="btn btn-sm btn-danger-soft px-2 mb-0" style={{ float: 'right', cursor: 'pointer' }} onClick={() => {
                    setCommentIdToDelete(comment.id);
                    setShowModal({ ...showModal, [comment.id]: true });
                  }}>                    <DeleteOutlineOutlinedIcon />
                  </button>
                  <p className="card-text">{comment.content}</p>
                  {comment.photo &&
                    <img
                      src={`data:image/jpeg;base64,${comment.photo}`}
                      alt="Comment"
                      className="img-fluid rounded"
                      style={{ maxWidth: '150px', cursor: 'pointer' }}
                    />
                  }
                </div>
              </div>
            </div>
            <Modal show={showModal[comment.id]} onHide={() => setShowModal({ ...showModal, [comment.id]: false })}>
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>Bạn có chắc chắn muốn xóa comment này?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal({ ...showModal, [comment.id]: false })}>
                  Hủy
                </Button>
                <Button variant="danger" onClick={() => handleDelete(comment.id)}>
                  Xóa
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      })}
    </div>
  );
};

export default Review
