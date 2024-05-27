import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data)
    })
  }, [])

  const handleNewRoomInputChange = (e) => {
    setNewRoomType(e.target.value)
  }

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType])
      setNewRoomType("")
      setShowNewRoomTypesInput(false)
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            name="roomType"
            id="roomType"
            value={newRoom.roomType}
            className='form-control'
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypesInput(true)
              } else {
                handleRoomInputChange(e)
              }
            }}>
            <option value={""}>select a room type</option>
            <option value={"Add New"}> Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}> {type} </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className='input-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Enter a new room type'
                onChange={handleNewRoomInputChange} />
              <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}> Add</button>

            </div>
          )}
        </div>
      )}

    </>
  //   <>
  //   <div>
  //     <select
  //       name="roomType"
  //       id="roomType"
  //       value={newRoom.roomType}
  //       className='form-control'
  //       onChange={(e) => {
  //         if (e.target.value === "Add New") {
  //           setShowNewRoomTypesInput(true);
  //         } else {
  //           handleRoomInputChange(e);
  //         }
  //       }}
  //     >
  //       {roomTypes.length === 0 && <option value={""}>No room types available, please add a new one</option>}
  //       <option value={""}>Select a room type</option>
  //       <option value={"Add New"}>Add New</option>
  //       {roomTypes.map((type, index) => (
  //         <option key={index} value={type}>{type}</option>
  //       ))}
  //     </select>
  //     {showNewRoomTypeInput && (
  //       <div className='input-group'>
  //         <input
  //           className='form-control'
  //           type='text'
  //           placeholder='Enter a new room type'
  //           value={newRoomType}
  //           onChange={handleNewRoomInputChange}
  //         />
  //         <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
  //       </div>
  //     )}
  //   </div>
  // </>
  )
}

export default RoomTypeSelector