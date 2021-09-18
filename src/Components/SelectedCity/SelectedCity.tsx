import React from 'react';
import './SelectedCity.css';
import { Link } from 'react-router-dom';
import { CleanData } from '../../util/dataCleaning';

interface Props {
    selectedCityData: CleanData
    resetCityData: any
}

const SelectedCity: React.FC<Props> = ({ selectedCityData, resetCityData }) => {
  const {city, state, timeStamp, aqi, temperature} = selectedCityData

  return (
    <section className='selected-city-card'>
      <p className='location-title'>I'm in</p>
      <h2 className='location-info'>{`${city}, ${state}`}</h2>
      <p className='aqi-title'>Current Conditions</p>            
      <p className='aqi-timestamp'>{`Last Updated ${timeStamp}`}</p>
      { aqi < 51 && <div><h3 className='aqi-value green'>{`${aqi} AQI`}</h3><p className='aqi-rating green'>Good</p></div> }
      { (aqi >= 51 && aqi < 101) && <div><h3 className='aqi-value yellow'>{`${aqi} AQI`}</h3><p className='aqi-rating yellow'>Moderate</p></div> }
      { (aqi >= 101 && aqi < 151) && <div><h3 className='aqi-value orange'>{`${aqi} AQI`}</h3><p className='aqi-rating orange'>Sensitive</p></div>}
      { aqi >= 151 && <div><h3 className='aqi-value red'>{`${aqi} AQI`}</h3><p className='aqi-rating red'>Unhealthy</p></div> }
      <p className='temp-title'>Current Temperature</p> 
      <p className='temp-value'>{`${temperature} F`}</p>
      <p className='select-prompt'>Pick a city to compare</p>
      <Link to={`/`}>
        <button className='home-button' onClick={() => resetCityData()}>Return Home</button>
      </Link>
    </section> 
  )
}

export default SelectedCity;