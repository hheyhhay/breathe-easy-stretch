import React from 'react'
import './Error.css';
import errorImage from './errorImage.png'
import { Link } from 'react-router-dom';

interface PropsError {
  message: string
  dataContents: string
  resetCityData: any
}

const Error: React.FC<PropsError>= ({ dataContents, message, resetCityData }) => {
  return (
    <div className='error-container'>
      <div className='error-card'>
        <h2 className='error-heading'>We've encountered an error in retrieving the {dataContents}.</h2>
        <p className='error-message'>{message}</p>
        <img
          alt='Error image'
          className='error-image'
          src={errorImage}
        />
        <Link to={`/`}>
          <button className='error-button'>Return Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Error;