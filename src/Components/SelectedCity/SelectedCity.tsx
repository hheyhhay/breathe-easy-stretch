import React, { useState, useEffect } from 'react'
import './SelectedCity.css'
import { Link } from 'react-router-dom'
import { CleanData } from '../../util/dataCleaning'
import { getCityData } from '../../apiCalls'
import {  cleanCityData } from '../../util/dataCleaning'

interface PropsSelectedCity {
    selectedCityData: CleanData
    resetCityData: any
    setCityDataError: any
    current: boolean
    setSelectedCityData: any
  }

const SelectedCity: React.FC<PropsSelectedCity> = ({ selectedCityData, resetCityData, setCityDataError, current, setSelectedCityData }) => {
  const [currentCityData, setCurrentCityData] = useState<CleanData | any>(0)  
  let city, state, timeStamp, aqi, temperature;
  ({city, state, timeStamp, aqi, temperature} = selectedCityData)
  if(current) {
    ({city, state, timeStamp, aqi, temperature} = currentCityData)
  }

  useEffect(() => {
    if (current) {
      getCityData(`https://api.airvisual.com/v2/nearest_city?key=1ba3e656-3c23-43ce-8e50-79fda3817502`)
      .then(data => cleanCityData(data))
      .then(data => {
        setCurrentCityData(data)
        setSelectedCityData(data)
        })
      .catch(error => setCityDataError(error.message))
    }
  }, [current])

  return (
    <section className='selected-city-card'>
      <div className='location-group'>
        <p className='location-title'>I'm in</p>
        <h2 className='location-info'>{`${city}, ${state}`}</h2>
      </div>
      <p className='aqi-title'>Current Conditions</p>            
      <p className='aqi-timestamp'>{`Last Updated ${timeStamp}`}</p>
      <div className='aqi-temp-group'>
        { aqi < 51 && <div><h3 className='aqi-value green'>{`${aqi} AQI`}</h3><p className='aqi-rating green'>Good</p></div> }
        { (aqi >= 51 && aqi < 101) && <div><h3 className='aqi-value yellow'>{`${aqi} AQI`}</h3><p className='aqi-rating yellow'>Moderate</p></div> }
        { (aqi >= 101 && aqi < 151) && <div><h3 className='aqi-value orange'>{`${aqi} AQI`}</h3><p className='aqi-rating orange'>Sensitive</p></div>}
        { aqi >= 151 && <div><h3 className='aqi-value red'>{`${aqi} AQI`}</h3><p className='aqi-rating red'>Unhealthy</p></div> }
        <h3 className='temp-value'>{`${temperature}°F`}</h3>
      </div>
      <p className='select-prompt'>Pick a city to compare</p>
      <Link to={`/`} onClick={() => resetCityData()}>
        <button className='home-button' >Return Home</button>
      </Link>
    </section> 
  )
}

export default SelectedCity;