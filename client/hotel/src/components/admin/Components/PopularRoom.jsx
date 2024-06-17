import React, { useEffect, useState } from 'react'
import { FaEllipsisV, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { deleteRoom, getAllRooms } from '../../utils/ApiFunctions';
import { Link } from 'react-router-dom';
const PopularRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage,setSuccessMessage] = useState(null)

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        setLoading(true)
        try {
            const result = await getAllRooms()
            const sortedRooms = result.sort((a, b) => b.bookings.length - a.bookings.length);

            // Lấy 4 phòng có lượt đặt nhiều nhất
            const topRooms = sortedRooms.slice(0, 4);
            setRooms(topRooms)
            setLoading(false)
        } catch (error) {
            setError(error.message)
        }
    }
    const handleDelete = async (roomId) => {
        if (window.confirm('Do you want delete thís room?')) {
          try {
            const result = await deleteRoom(roomId);
            if (result === "") {
              setSuccessMessage(`Room No ${roomId} was deleted!`);
              fetchRooms();
              console.log(roomId);
            } else {
              console.error(`Error deleting room: ${result.message}`);
              setError(`Error deleting room: ${result.message}`);
            }
          } catch (error) {
            setError(error.message);
          }
          setTimeout(() => {
            setSuccessMessage("");
            setError("");
          }, 3000);
        }
      };
    return (
        <div>
            <div className='row g-4 mb-5'>
                <div className='col-12'>
                    <div className='d-flex justify-content-between'>
                        <h4>Popular Rooms</h4>
                    </div>
                </div>
                {rooms.map(room => (
                <>
                    <div className="col-lg-6" key={room.id}>
                        <div className="card shadow p-3">
                            <div className="row g-4">
                                <div className="col-md-3">
                                    <img
                                        src={`data:image/png;base64, ${room.photo}`}
                                        className="rounded-2 img-fluid"
                                        alt="Card image"
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body position-relative d-flex flex-column p-0 h-100">
                                        <div className="btn-group list-inline-item position-absolute top-0 end-0">
                                            <button
                                                className="btn btn-md btn-link p-0 m-0 dropdown-toggle dropdown-toggle-no-caret"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <button className="btn btn-sm btn-light btn-round" role="button" type="button">
                                                    <FaEllipsisV />
                                                </button>
                                            </button>
                                            <ul className="dropdown-menu overflow-auto min-width-auto shadow" aria-labelledby="dropdownMenuButton">
                                                <li className="small">
                                                    <a className="dropdown-item" href="#">
                                                        <FaEdit className="me-2" />
                                                        Report
                                                    </a>
                                                </li>
                                                <li className="small">
                                                    <a className="dropdown-item" href="#">
                                                        <FaTrash className="me-2" />
                                                        Disable
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <h5 className="card-title mb-0 me-5">                                        
                                                {room.name}
                                        </h5>
                                        <small>
                                            <FaMapMarkerAlt className="me-1 mb-1" />
                                            31J W Spark Street, California - 24578
                                        </small>
                                        <div className="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">
                                            <div className="d-flex align-items-center">
                                                <h5 className="fw-bold mb-0 me-1">${room.roomPrice}</h5>
                                                <span className="mb-0 me-2">/day</span>
                                            </div>
                                            <div className="hstack gap-2 mt-3 mt-sm-0">
                                                <button className="btn btn-sm btn-primary-soft px-2 mb-0">
                                                    <Link to={`/admin/edit-room/${room.id}`}><EditNoteIcon color="primary"/></Link>
                                                </button>
                                                <button className="btn btn-sm btn-danger-soft px-2 mb-0" onClick={() => handleDelete(room.id)}>
                                                    <NotInterestedIcon color="secondary"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ))}


            </div>
        </div>
    )
}

export default PopularRoom
