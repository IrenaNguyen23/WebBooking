import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { Link, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputLabel } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EditRoom = () => {
    const [room, setRoom] = useState({
        name: "",
        description: "",
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
        } setTimeout(() => {
            setSuccesMessage("")
            setErrorMessage("")
        }, 3000)
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
                            <label htmlFor="name" className='form-label hotel-color'>
                                Room Name
                            </label>
                            <input
                                className='form-control'
                                required
                                id='name'
                                type='text'
                                name='name'
                                value={room.name}
                                onChange={handleInputChange} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="description" className='form-label hotel-color'>
                                Description
                            </label>
                            <textarea
                                className='form-control'
                                required
                                id='description'
                                type='text'
                                name='description'
                                value={room.description}
                                onChange={handleInputChange} />
                        </div>

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
                            <InputLabel htmlFor="photo" className='form-label hotel-color'>
                                Room Photo
                            </InputLabel>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Choose file
                                <VisuallyHiddenInput id="photo" name="photo"
                                    onChange={handleImageChange} type="file" />
                            </Button>

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