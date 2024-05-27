import React from 'react'

const MainHeader = () => {
  return (
    <header className='header-banner'>
        <div className='overlay'></div>
        <div className='animated-texts overlay-content'>
            <h1>Welcome To <span className='hotel-color'>Irena Hotel</span></h1>
            <h4>Experience the Best Hospitality in Town</h4>
        </div>
    </header>
  )
}

export default MainHeader