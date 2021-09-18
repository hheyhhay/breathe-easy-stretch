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
    <article>
      <h3>{`${city}, ${state}`}</h3>
      <p>{aqi} AQI</p>
      {aqiDifference < 0 ? <p>{`${Math.abs(aqiDifference)} AQI less than ${selectedCityData.city}`}</p> : <p>{`${Math.abs(aqiDifference)} AQI more than ${selectedCityData.city}`}</p>}
      <p>{temperature} F</p>
      <p>{`Last Updated ${timeStamp}`}</p>
      <p>{`${distanceBetween} miles from your city`}</p>
      <button onClick={() => deleteCityData(location)}>🗑</button>
    </article>
  ) 
}

export default OtherCity