import React from 'react'
import './Loading.css';
import loadingImage from './loadingImage.jpeg'

const Loading = () => {
  return (
    <div className='loading-container'>
      <img
        alt='Loading'
        className='loading-image'
        src={loadingImage}
      ></img>  
    </div>
  )
}

export default Loading;