import React from 'react'
import './Error.css';
import errorImage from './errorImage.png'
import { Link } from 'react-router-dom';

interface PropsError {
  message: string
  dataContents: string
  linkPath: string
  buttonMessage: string
}

const Error: React.FC<PropsError>= ({ dataContents, message, linkPath, buttonMessage }) => {
  return (
    <div className='error-container'>
      <h2 className='error-heading'>We've encountered an error in retrieving the {dataContents}.</h2>
      <p className='error-message'>{message}</p>
      <img
        alt='Error image'
        className='error-image'
        src={errorImage}
      />
      <Link to={`/${linkPath}`}>
        <button className='error-button'>{buttonMessage}</button>
      </Link>
    </div>
  )
}

export default Error;