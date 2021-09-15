import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import './Form.css';
import { states } from '../../util/data'

// interface IState {
//     allStates: string[],
//     selectedState: string,
//     selecetedCity: string,
//     allCitiesInState: string[],
// }

const Form = (props: {setData: any}) => {
    const [selectedState, setSelectedState ] = useState<string>('')
    const [allCitiesInState, setAllCitiesInState ] = useState<string[]>([])
    const [selectedCity, setSelectedCity ] = useState<string>('')
    const [citiesError, setCitiesError ] = useState<string>('')
  
    useEffect(() => {
      if (selectedState) {
        getCities()
      }
    }, [selectedState])
  
    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedState(event.target.value)
    }
  
    const getCities = () => {
      getData(`http://api.airvisual.com/v2/cities?state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
        .then(data => cleanAllCitiesData(data))
        .then(data => setAllCitiesInState(data))
        .catch(error => setCitiesError(error.message))
    }
  
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(event.target.value)
    }
    
    const clearInputs = (event: MouseEvent) => {
      event.preventDefault()
      
      setSelectedState('')
      setAllCitiesInState([])
      setSelectedCity('')
  
      props.setData(event, '', [], '')
    }

    const stateOptions = states.map((state, index) => {
        return (<option key={index} value={state}>{state}</option>)
    })
  
    const cityOptions = allCitiesInState.map((city, index) => {
        return (<option key={index} value={city}>{city}</option>)
    })
  
    return (
      <section>
        <form onSubmit={event => props.setData(event, selectedState, selectedCity)}>
          <select value={selectedState} onChange={event => handleStateChange(event)}>
            <option value=''>- Select a State -</option>
            { stateOptions }
          </select>
          <select value={selectedCity} onChange={event => handleCityChange(event)}>
            <option value=''>Select a City</option>
            { cityOptions }
          </select>
          <input type="submit" value="Show AQI" />   
        </form>
        <button onClick={event => clearInputs(event)}>Reset Form</button>
      </section>
    )
  }
  
  export default Form