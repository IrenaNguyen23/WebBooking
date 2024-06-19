import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material'

const TruncatedTableCell = styled('td')({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '250px', // Điều chỉnh chiều rộng theo nhu cầu của bạn
  });

const ExistingRoom = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRoom] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])


    const fetchRooms = async () => {
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRoom(rooms)
        } else {
            const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRoom(filteredRooms)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if (result === "") {
                setSuccessMessage(`Room No ${roomId} was delete!`)
                fetchRooms()
                console.log(roomId)
            } else {
                console.error(`Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms</p>

            ) : (
                <>
                    <section className='mt-5 mb-5 container'>
                        <div className='d-flex justify-content-between mb-3 mt-5'>
                        {successMessage && (
                            <div className='alert alert-success fade show'>{successMessage}</div>
                        )}
                        {errorMessage &&
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        }
                            <h2>Manager Rooms</h2>
                            
                        </div>
                        <Row>
                            <Col md={6} className='mb-3 mb-md-0'>
                                <RoomFilter data={rooms} setFilteredData={setFilteredRoom} />
                            </Col>
                            <Col md={6} className='d-flex justify-content-end'>
                            <Link to={"/admin/add-room"}>
                                <FaPlus /> Add Room
                            </Link>
                            </Col>
                        </Row>

                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>
                                        ID
                                    </th>
                                    <th>Room Name</th>
                                    <th>Description</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className='text-center'>
                                        <td>{room.id}</td>
                                        <td>{room.name}</td>
                                        <TruncatedTableCell>{room.description}</TruncatedTableCell>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className='gap-2'>
                                            <Link to={`/admin/edit-room/${room.id}`}>
                                                <span className='btn btn-info btn-sm'>
                                                    <FaEye />
                                                </span>
                                                <span className='btn btn-warning btn-sm'>
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className='btn btn-danger btn-sm'
                                                onClick={() => handleDelete(room.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingRoom