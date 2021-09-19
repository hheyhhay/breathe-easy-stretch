import React from 'react'
import './Loading.css';
import loadingImage from './loadingImage.jpeg'

const Loader = () => {
  return (
    <div className='loading-container'>
      <h2 className='loading-heading'>Hang tight!</h2>
      <p>The AQI Data for your selected city is loading.</p>
      <img
        alt='Loading image'
        className='loading-image'
        src={loadingImage}
      ></img>  
    </div>
  )
}

export default Loader;