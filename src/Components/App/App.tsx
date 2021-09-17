import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom';
import SelectedCity from '../SelectedCity/SelectedCity'
import './App.css'
import Form from '../Form/Form'
import { cleanCityData, CleanData } from '../../util/dataCleaning'
import { getCityData } from '../../apiCalls';

  
const App: React.FunctionComponent = () => {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedCityData, setSelectedCityData] = useState<CleanData | any>({ })  
  const [cityDataError, setCityDataError] = useState<string>('')

  useEffect(() => {
    if (selectedCity) {
      getSelectedCityData()
    }
  }, [selectedCity])

  // useEffect(() => {
  //   if (currentOtherCity) {
  //     getCurrentOtherCityData()
  //   }
  // }, [currentOtherCity])

  const setData = ( selectedState: string, selectedCity: string) => {
 
    setSelectedState(selectedState)
    setSelectedCity(selectedCity)
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


  // CSS CODE TO BE PUT BACK IN



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
            <Form setData= {setData}/>
          </section>
        }
      />
      <Route exact path={'/find-cleanest-air'}
        render={() => 
          <aside className='selected-city-aside'>
            <div className='selected-city-nav'></div>
            <section className='selected-city-container'>
              { selectedCityData && <SelectedCity selectedCityData={selectedCityData} />}
            </section>
            <div className='compare-form-container'>
                <Form setData = {setData} />
              </div>
          </aside>
        }
      />
    
    </main>
  )
}

export default App;
