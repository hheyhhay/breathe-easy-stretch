import React from 'react'
import './OtherCities.css'
import OtherCity from '../OtherCity/OtherCity'
import { CleanData } from '../../util/dataCleaning'

interface PropsOtherCities {
  otherCitiesData: CleanData[]
  deleteCityData: any
  selectedCityData: any
}

const OtherCities: React.FC<PropsOtherCities> = ({ otherCitiesData, deleteCityData, selectedCityData }) => {
  
  const otherCityCards = otherCitiesData.map(otherCity => {
    return (
      <OtherCity
        city={otherCity.city}
        state={otherCity.state}
        aqi={otherCity.aqi}
        timeStamp={otherCity.timeStamp}
        temperature={otherCity.temperature}
        location={otherCity.location}
        key={otherCity.location.join('')}
        deleteCityData={deleteCityData}
        selectedCityData={selectedCityData}
      />
    )
  })

  return (
    <div>
      {otherCityCards.length > 0 && 
      <section className='other-cities-container'>{otherCityCards}</section>}
    </div>
  )
}

export default OtherCities