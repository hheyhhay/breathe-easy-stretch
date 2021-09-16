import React, { useState, useEffect } from 'react'
import './App.css'
import Form from '../Form/Form'
import { cleanCityData } from '../../util/dataCleaning'
import { getCityData } from '../../apiCalls';


interface SelectedCity {
    city: string
    aqi: number
    timeStamp: string
    temperature: number
    location: number[]
}
  
const App: React.FunctionComponent = () => {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedCityData, setSelectedCityData] = useState<SelectedCity | {}>({})  
  // const [currentOtherCity, setCurrentOtherCity] = useState<string>('')
  // const [otherCitiesData, setOtherCitiesData] = useState<SelectedCity[] | []>([])
  const [cityDataError, setCityDataError] = useState<string>('')
  // const [otherCitiesDataError, setOtherCitiesDataError] = useState<string>('')  

  useEffect(() => {
    if (selectedCity) {
      getSelectedCityData()
    }
  }, [])

  // useEffect(() => {
  //   if (currentOtherCity) {
  //     getCurrentOtherCityData()
  //   }
  // }, [currentOtherCity])

  const setData = (event: React.MouseEvent, selectedState: string, selectedCity: string) => {
    event.preventDefault()

    setSelectedState(selectedState)
    setSelectedCity(selectedCity)
    if (selectedCity) {
      getSelectedCityData()
    }
  }

  const getSelectedCityData = () => {
    getCityData(`http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => setSelectedCityData(data))
      .catch(error => setCityDataError(error.message))
  }

  const getCurrentLocationData = () => {
    getCityData(`http://api.airvisual.com/v2/nearest_city?key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => setSelectedCityData(data))
      .catch(error => setCityDataError(error.message))
  }

  // const getCurrentOtherCityData = () => {
  //   getCityData(`http://api.airvisual.com/v2/city?city=${currentOtherCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
  //     .then(data => cleanCityData(data))
  //     .then(data => setOtherCitiesData(...otherCitiesData, data))
  //     .catch(error => setOtherCitiesDataError(error.message))
  // }

  return (
    <main>
       <img className='backdrop' src={'stretch-background.jpg'}></img>
      <div className='darken-backdrop'>
      </div>
        <section className='welcome-container'>
          <div className='logo-container'>
            <h1 className='logo'>Breezy</h1>
            <h2 className='slogan'>-Breathe Easy.-</h2>
          </div>
        <p className='guiding-text'>Find the cleanest air around.</p>
        <button className='current-location-button' onClick={() => getCurrentLocationData()}>Use Current Location</button>
        <Form setData= {setData}/>
      </section>
     
     
    </main>
  )
}

export default App;
