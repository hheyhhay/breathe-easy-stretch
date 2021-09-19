import React, { useState } from 'react'
import './App.css'
import Form from '../Form/Form'
import SelectedCity from '../SelectedCity/SelectedCity'
import OtherCities from '../OtherCities/OtherCities'
import { Link, Route } from 'react-router-dom';
import { cleanCityData, CleanData } from '../../util/dataCleaning'
import { getCityData } from '../../apiCalls';

  
const App: React.FunctionComponent = () => {
  const [selectedCityData, setSelectedCityData] = useState<CleanData | any>(0)  
  const [otherCitiesData, setOtherCitiesData] = useState<CleanData[]>([])
  const [cityDataError, setCityDataError] = useState<string>('')

  const getSelectedCityData = (selectedState: string, selectedCity: string) => {
    getCityData(`http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=8b1bc68f-68fc-497f-8392-79664f6b493f`)
      .then(data => cleanCityData(data))
      .then(data => addSelectedOrOtherCity(data))
      .catch(error => setCityDataError(error.message))
  }

  const addSelectedOrOtherCity = (data: CleanData) => {
    if (!selectedCityData) {
      setSelectedCityData(data)
    } else {
      checkSortData(data)
    }
  }

  const checkSortData = (data: CleanData) => {
    if (!otherCitiesData.includes(data)) {
      setOtherCitiesData([...otherCitiesData, data].sort((a, b) => a.aqi - b.aqi))
    }
  }

  const getCurrentLocationData = () => {
    getCityData(`http://api.airvisual.com/v2/nearest_city?key=8b1bc68f-68fc-497f-8392-79664f6b493f`)
      .then(data => cleanCityData(data))
      .then(data => setSelectedCityData(data))
      .catch(error => setCityDataError(error.message))
  }

  const deleteCityData = (id: number[]) => {
    const filteredOtherCities = otherCitiesData.filter(city => city.location !== id)

    setOtherCitiesData(filteredOtherCities)
  }

  const resetCityData = () => {
    setSelectedCityData(0)
    setOtherCitiesData([])
  }

  return (
    <main>
      <img className='backdrop' src={'stretch-background.jpg'}></img>
      <div className='darken-backdrop'></div>
      
      <Route exact path='/'
        render={() => 
          <section className='welcome-container'>
            <div className='logo-container'>
              <h1 className='logo'>Breezy</h1>
              <h2 className='slogan'>-Breathe Easy.-</h2>
            </div>
            <p className='guiding-text'>Find the cleanest air around.</p>
            <Link to={'/find-cleanest-air'}>
              <button className='current-location-button' onClick={() => getCurrentLocationData()}>Use Current Location</button>
            </Link>
            <Form getSelectedCityData={getSelectedCityData}/>
          </section>
        }
      />

      <Route exact path={'/find-cleanest-air'}
        render={() => 
          <nav className='selected-city-nav'>
            <div className='selected-city-shading'></div>
            <section className='selected-city-container'>
              <SelectedCity 
                selectedCityData={selectedCityData} 
                resetCityData={resetCityData}
              />
            </section>
            <div className='compare-form-container'>
              <Form getSelectedCityData={getSelectedCityData} />
            </div>
            <OtherCities 
              otherCitiesData={otherCitiesData} 
              deleteCityData={deleteCityData} 
              selectedCityData={
                {
                  city: selectedCityData.city, 
                  location: selectedCityData.location, 
                  aqi: selectedCityData.aqi
                }
              } 
            />
          </nav>
        }
      />
    </main>
  )
}

export default App;
