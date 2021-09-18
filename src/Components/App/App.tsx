import React, { useState } from 'react'
import './App.css'
import Form from '../Form/Form'
import SelectedCity from '../SelectedCity/SelectedCity'
import { Link, Route } from 'react-router-dom';
import { cleanCityData, CleanData } from '../../util/dataCleaning'
import { getCityData } from '../../apiCalls';

  
const App: React.FunctionComponent = () => {
  const [selectedCityData, setSelectedCityData] = useState<CleanData | any>({ })  
  const [otherCitiesData, setOtherCitiesData] = useState<CleanData[]>([])
  const [cityDataError, setCityDataError] = useState<string>('')

  const getSelectedCityData = (selectedState, selectedCity) => {
    getCityData(`http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => {
        if (!selectedCityData) {
          setSelectedCityData(data)
        } else {
          setOtherCitiesData([...otherCitiesData, data].sort((a, b) => a.aqi - b.aqi))
        }
      })
      .catch(error => setCityDataError(error.message))
  }

  const getCurrentLocationData = () => {
    getCityData(`http://api.airvisual.com/v2/nearest_city?key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => setSelectedCityData(data))
      .catch(error => setCityDataError(error.message))
  }

  const deleteCityData = (id) => {
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
              { selectedCityData && <SelectedCity selectedCityData={selectedCityData} />}
            </section>
            <div className='compare-form-container'>
                <Form setData = {setData} />
              </div>
          </nav>
        }
      />
    
    </main>
  )
}

export default App;
