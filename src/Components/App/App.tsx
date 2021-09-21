import React, { useState } from 'react'
import './App.css'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import Form from '../Form/Form'
import SelectedCity from '../SelectedCity/SelectedCity'
import OtherCities from '../OtherCities/OtherCities'
import { Switch, Route, Link } from 'react-router-dom';
import { cleanCityData, CleanData } from '../../util/dataCleaning'
import { getCityData } from '../../apiCalls';
  
const App: React.FunctionComponent = () => {
  const [selectedCityData, setSelectedCityData] = useState<CleanData | any>(0)  
  const [otherCitiesData, setOtherCitiesData] = useState<CleanData[]>([])
  const [citiesError, setCitiesError] = useState<string>('')
  const [cityDataError, setCityDataError] = useState<string>('')
  const [duplicateCityError, setDuplicateCityError] = useState<string>('')

  const getSelectedCityData = (selectedState: string, selectedCity: string) => {
    getCityData(`https://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=e4f6cdec-d71a-4a7e-b4dc-e8a7f1b4fb7a`)
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
    const checkIfIncludesCity = otherCitiesData.filter(otherCity => otherCity.city === data.city)

    if (!checkIfIncludesCity.length) {
      setOtherCitiesData([...otherCitiesData, data].sort((a, b) => a.aqi - b.aqi))
    } else {
      setDuplicateCityError('This city is already being compared.')
      setTimeout(() => {
        setDuplicateCityError('')
      }, 3000);
    }
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
      <img className='backdrop' alt='sunset-backdrop' src={'stretch-background.jpg'}></img>
      <div className='darken-backdrop'></div>
      <Switch>
        <Route exact path='/'
          render={() => 
            <>
              {citiesError ?
                <Error 
                  dataContents='AQI data for available cities in that state'
                  message={citiesError}
                />
              :
                <section className='welcome-container'>
                  <div className='logo-container'>
                    <h1 className='logo'>Breezy</h1>
                    <h2 className='slogan'>-Breathe Easy.-</h2>
                  </div>
                  <p className='guiding-text'>Find the cleanest air around.</p>
                  <Link to={`/current`}>
                    <button className='current-location-button'>Use Current Location</button>
                  </Link>
                  <Form 
                    setCitiesError={setCitiesError}
                    getSelectedCityData={getSelectedCityData}
                    duplicateCityError={duplicateCityError} 
                    selectedCityData={selectedCityData}
                    setCityDataError={setCityDataError}
                  />
                </section>
              }
            </>
          }
        />
        <Route exact path={'/current'}
          render={() => 
          <>
            {
            cityDataError ?
              <Error 
                dataContents='AQI data for your city'
                message={cityDataError}
              />
            :
              <nav className='selected-city-nav'>
                <div className='selected-city-shading'></div>
                <section className='selected-city-container'>
                  <SelectedCity 
                    selectedCityData={selectedCityData} 
                    resetCityData={resetCityData}
                    setCityDataError={setCityDataError}
                    current={true}
                    setSelectedCityData={setSelectedCityData}
                  /> 
                  </section>
                  <div className='compare-form-container'>
                    <Form 
                      setCitiesError={setCitiesError}
                      getSelectedCityData={getSelectedCityData} 
                      duplicateCityError={duplicateCityError} 
                      selectedCityData={selectedCityData}
                      setCityDataError={setCityDataError}
                    />
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
            </>
          }
        />
        
        <Route exact path={'/:selectedState/:selectedCity'}
          render={({ match }) => 
            <>
              {!selectedCityData && getSelectedCityData(match.params.selectedState, match.params.selectedCity)}
              
              {cityDataError ?
                <Error 
                  dataContents='AQI data for your city'
                  message={cityDataError}
                />
              : !selectedCityData ?
                <Loading />
              :
                <nav className='selected-city-nav'>
                  <div className='selected-city-shading'></div>
                  <section className='selected-city-container'>
                    <SelectedCity 
                      selectedCityData={selectedCityData} 
                      resetCityData={resetCityData}
                      setCityDataError={setCityDataError}
                      current={false}
                      setSelectedCityData={setSelectedCityData}
                    />
                  </section>
                  <div className='compare-form-container'>
                    <Form 
                      setCitiesError={setCitiesError}
                      getSelectedCityData={getSelectedCityData} 
                      duplicateCityError={duplicateCityError} 
                      selectedCityData={selectedCityData}
                      setCityDataError={setCityDataError}
                    />
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
            </>
          }
        />
        <Route>
          <Error 
          dataContents='AQI data for available cities in that state'
          message={citiesError}
          />
        </Route>
      </Switch>
    </main>
  )
}

export default App;
