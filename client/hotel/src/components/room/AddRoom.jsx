import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'
const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
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

        // Kiểm tra nếu trường là "roomPrice" và giá trị không phải là số
        if (name === "roomPrice" && isNaN(value)) {
            // Gán giá trị thành rỗng để ngăn việc nhập kí tự không phải số
            value = "";
        } else if (name === "roomPrice" && !isNaN(value)) {
            // Chuyển đổi giá trị thành số nguyên
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
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if (success !== undefined) {
                setSuccesMessage("A new room was added successfully")
                setNewRoom({ photo: null, roomType: "", roomPrice: "" })
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
                                <label htmlFor="photo" className='form-label'>
                                    Room Photo
                                </label>
                                <input
                                    id="photo"
                                    className='form-control'
                                    type="file"
                                    name="photo"
                                    onChange={handleImageChange} />
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