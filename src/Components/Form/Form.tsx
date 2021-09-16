import React, { useState, useEffect } from 'react';
import './Form.css';
import { allStates } from '../../util/data'
import { getCityList } from '../../apiCalls'
import {  cleanAllCitiesData } from '../../util/dataCleaning'


const Form = (props: any ) => {
    const [selectedState, setSelectedState ] =useState<string>('')
    const [allCitiesInState, setAllCitiesInState ] = useState<string[]>([''])
    const [selectedCity, setSelectedCity ] = useState<string>('')
    const [citiesError, setCitiesError ] = useState<boolean>(false)

    useEffect(() => {
        if(selectedState) {
            getCities()
        }
    }, [selectedState])

const getCities = () => {
    getCityList(`http://api.airvisual.com/v2/cities?state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
    .then(data => cleanAllCitiesData(data))
    .then(data => setAllCitiesInState(data))
}

const stateOptions = allStates.map((state: string, index: number) => {
    return (<option key={index} value={state}>{state}</option>)
})
const cityOptions = allCitiesInState.map((city: string, index: number) => {
    return (<option key={index} value={city}>{city}</option>)
})

const clearInputs = (event: React.MouseEvent) => {
    event.preventDefault()
    
    setSelectedState('')
    setAllCitiesInState([])
    setSelectedCity('')

    props.setData(event, '', [], '')
  }

const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    e.preventDefault()
    setSelectedState(e.target.value)
}

const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    e.preventDefault()
    setSelectedCity(e.target.value)
}


return (
    <section>
    <form className='location-form' onSubmit={event => props.setData(event, selectedState, selectedCity)}>
      <select className='state-select' value={selectedState} onChange={e => handleStateChange(e)}>
        <option value=''>- Select a State -</option>
        { stateOptions }
      </select>
      <select className='city-select' value={selectedCity} onChange={e => handleCityChange(e)}>
        <option value=''>Select a City</option>
        { cityOptions }
      </select>
      <input className='form-submit' type='submit' value='Show AQI' /> 
      <button className='reset-button' onClick={event => clearInputs(event)}>Reset Form</button>  
    </form>
  
  </section>
)
}

export default Form