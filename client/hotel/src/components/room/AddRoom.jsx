import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'
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

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        name: "",
        description: "",
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [succesMessage, setSuccesMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "roomPrice" && isNaN(value)) {
            value = "";
        } else if (name === "roomPrice" && !isNaN(value)) {
            value = parseInt(value);
        }

        // Cập nhật state với giá trị mới
        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.name, newRoom.description, newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if (success !== undefined) {
                setSuccesMessage("A new room was added successfully")
                setNewRoom({ name: "", description: "", photo: null, roomType: "", roomPrice: "" })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccesMessage("")
            setErrorMessage("")
        }, 3000)
    }

    console.log(newRoom)
    return (
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-5'>Add New Room</h2>
                        {succesMessage && (
                            <div className='alert alert-success fade show'>{succesMessage}</div>
                        )}
                        {errorMessage &&
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        }

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="name" className='form-label'>
                                    Room Name
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id='name'
                                    type='text'
                                    name='name'
                                    value={newRoom.name}
                                    onChange={handleRoomInputChange} />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="description" className='form-label'>
                                    Description
                                </label>
                                <textarea
                                    className='form-control'
                                    required
                                    id='description'
                                    type='text'
                                    name='description'
                                    value={newRoom.description}
                                    onChange={handleRoomInputChange} />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="roomType" className='form-label'>
                                    Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="roomPrice" className='form-label'>
                                    Room Price
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id='roomPrice'
                                    type='number'
                                    name='roomPrice'
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange} />
                            </div>

                            <div className='mb-3'>
                                <InputLabel htmlFor="photo" className='form-label'>
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
                                    <VisuallyHiddenInput id="photo" name="photo" className='form-control'
                                        onChange={handleImageChange} type="file" />
                                </Button>
                                {imagePreview && (
                                    <img src={imagePreview}
                                        alt='Preview Room Photo'
                                        style={{ maxWidth: "480px", maxHeight: "480px" }}
                                        className='mb-3' />
                                )}
                            </div>
                            <div className='d-grid d-md-flex mt-2'>
                                <Link className='btn btn-outline-info me-5' to={"/existing-rooms"}>
                                    Back
                                </Link>
                                <button className="btn btn-outline-primary">
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom