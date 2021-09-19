import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import { allStates } from '../../util/data'
import { getCityList } from '../../apiCalls'
import {  cleanAllCitiesData } from '../../util/dataCleaning'

interface PropsForm {
  setCitiesError: any
  getSelectedCityData: any
  duplicateCityError: string
}

const Form: React.FC<PropsForm> = ({ setCitiesError, getSelectedCityData, duplicateCityError }) => {
  const [selectedState, setSelectedState] = useState<string>('')
  const [allCitiesInState, setAllCitiesInState] = useState<string[]>([''])
  const [selectedCity, setSelectedCity] = useState<string>('')

  useEffect(() => {
    if (selectedState) {
      getCityList(`http://api.airvisual.com/v2/cities?state=${selectedState}&country=USA&key=8b1bc68f-68fc-497f-8392-79664f6b493f`)
      .then(data => cleanAllCitiesData(data))
      .then(data => setAllCitiesInState(data))
      .catch(error => setCitiesError(error.message))
    }
  }, [selectedState])

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      setSelectedState(e.target.value)
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(e.target.value)
  }

  const stateOptions = allStates.map((state: string, index: number) => {
      return (<option key={index} value={state}>{state}</option>)
  })
  const cityOptions = allCitiesInState.map((city: string, index: number) => {
      return (<option key={index} value={city}>{city}</option>)
  })

  const clearInputs = () => {
    setSelectedState('')
    setAllCitiesInState([])
    setSelectedCity('')
  }

  return (
    <section className='location-container'>
      <form className='location-form'>
        <p className='error-duplicate'>{duplicateCityError}</p>
        <select className='state-select' value={selectedState} onChange={e => handleStateChange(e)} required>
          <option value='' disabled={true}>- Select a State -</option>
          { stateOptions }
        </select>
        <select className='city-select' value={selectedCity} onChange={e => handleCityChange(e)} required>
          <option value='' disabled={true}>- Select a City -</option>
          { cityOptions }
        </select>
      </form>
      <div className='form-buttons'>
        <Link to={'/find-cleanest-air'}>
          <button className='form-submit' onClick={()=> getSelectedCityData(selectedState, selectedCity)}>Show AQI</button>
        </Link>
        <button className='reset-button' onClick={() => clearInputs()}>Reset Form</button>  
      </div>
  </section>
  )
}

export default Form