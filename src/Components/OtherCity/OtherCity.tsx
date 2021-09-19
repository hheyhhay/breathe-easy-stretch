import React from 'react'
import './OtherCity.css'
import { getDistance } from '../../util/distanceFormula'

interface Props {
  city: string
  state: string
  aqi: number
  timeStamp: string
  temperature: number
  location: number[]
  deleteCityData: any
  selectedCityData: any
}

const OtherCity: React.FC<Props> = ({ city, state, aqi, timeStamp, temperature, location, deleteCityData, selectedCityData }) => {
  const aqiDifference = aqi - selectedCityData.aqi
  const distanceBetween = getDistance(selectedCityData.location[0], selectedCityData.location[1], location[0], location[1])

  return (
    <article className='other-city-card'>
      <div className='location-timestamp-group'>
        <h3 className='other-city-location'>{`${city}, ${state}`}</h3>
        <p className='other-city-timestamp'>{`Last Updated ${timeStamp}`}</p>
      </div>
      <div className='temp-aqi-group'>
        <p className='other-city-aqi'>{aqi} AQI</p>
        <p className='other-city-temp'>{temperature}°F</p>
      </div>
      <div className='distance-difference-group'>
        {aqiDifference < 0 ? 
          <p className='aqi-difference green'>{`▼ ${Math.abs(aqiDifference)} AQI less than ${selectedCityData.city}`}</p> : 
          <p className='aqi-difference red'>{`▲ ${Math.abs(aqiDifference)} AQI more than ${selectedCityData.city}`}</p>
        }
        <p className='other-city-distance'>{`${distanceBetween} mi away`}</p>
      </div>
      <button className='delete-other-city' onClick={() => deleteCityData(location)}>x</button>
    </article>
  ) 
}

export default OtherCity