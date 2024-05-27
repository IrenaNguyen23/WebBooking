import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { useParams } from 'react-router-dom'
import { getRoomById } from '../utils/ApiFunctions'
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel'

const CheckOut = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [roomInfo, setRoomInfo] = useState({photo:"",roomType:"",roomPrice:""})

  const {roomId} = useParams()

  useEffect(() =>{
    setTimeout(() =>{
      getRoomById(roomId)
      .then((response) =>{
        setRoomInfo(response)
        setIsLoading(false)
      }).catch((error) =>{
        setError(error)
        setIsLoading(false)
      })
    },2000)
  },[roomId])

  return (
    <div>
      <section className='container'>
        <div className='row flex-column flex-md-row align-items-center'>
          <div className='col-md-4 mt-5 mb-5'>
            {isLoading ? (
              <p>Loading Room Information</p>
            ) : error ? (
              <p>{error}</p>
            ): (
              <div className='room-info'>
                <img src={`data:image/png;base64,${roomInfo.photo}`} alt="Room Photo"
                style={{width:"100%", height:"200px"}} />
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <th>{roomInfo.roomType}</th>
                    </tr>
                    <tr>
                      <th>Price Per Night:</th>
                      <th>${roomInfo.roomPrice}</th>
                    </tr>
                    <tr>
                      <th>Service:</th>
                      <td>
                        <ul className='list-unstyled'>
                          <li>
                            <FaWifi/> Wifi
                          </li>
                          <li>
                            <FaTv/> Netfilx Premium
                          </li>
                          <li>
                            <FaUtensils/> Breakfast
                          </li>
                          <li>
                            <FaWifi/> Wifi
                          </li>
                          <li>
                            <FaWineGlassAlt/> Mini Bar refreshment
                          </li>
                          <li>
                            <FaCar/> Car Service
                          </li>
                          <li>
                            <FaParking/> Parking Space
                          </li>
                          <li>
                            <FaTshirt/> Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='col-md-8'>
          <BookingForm/>
          </div>          
        </div>
      </section>
      <div className='container'>
        <RoomCarousel/>
      </div>
    </div>
  )
}

export default CheckOut