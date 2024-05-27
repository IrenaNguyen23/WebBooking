import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { Link, useParams } from 'react-router-dom'

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [succesMessage, setSuccesMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { roomId } = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRoom({ ...room, [name]: value })
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateRoom(roomId, room)
            if (response.status === 200) {
                setSuccesMessage("Room update successfully!")
                const updateRoomData = await getRoomById(roomId)
                setRoom(updateRoomData)
                setImagePreview(updateRoomData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }


    return (
        <div className='container mt-5 mb-5'>
            <h2 className='text-center mt-5 mb-5'>Edit Room</h2>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    {succesMessage && (
                        <div className='alert alert-success fade show'>{succesMessage}</div>
                    )}
                    {errorMessage &&
                        <div className='alert alert-danger fade show'>{errorMessage}</div>
                    }

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="roomType" className='form-label hotel-color'>
                                Room Type
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='roomType'
                                name='roomType'
                                value={room.roomType}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="roomPrice" className='form-label hotel-color'>
                                Room Price
                            </label>
                            <input
                                className='form-control'
                                required
                                id='roomPrice'
                                type='number'
                                name='roomPrice'
                                value={room.roomPrice}
                                onChange={handleInputChange} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="photo" className='form-label hotel-color'>
                                Room Photo
                            </label>
                            <input
                                id="photo"
                                className='form-control'
                                type="file"
                                name="photo"
                                onChange={handleImageChange} />
                            {imagePreview && (
                                <img src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt='Preview Room Photo'
                                    style={{ maxWidth: "480px", maxHeight: "480px" }}
                                    className='mb-3' />
                            )}
                        </div>
                        <div className='d-grid d-md-flex mt-2'>
                            <Link className='btn btn-outline-info ml-5' to={"/existing-rooms"}>
                            Back
                            </Link>
                            <button className="btn btn-outline-warning" type='submit'>
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom