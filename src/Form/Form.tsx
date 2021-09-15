import React, { useState, useEffect } from 'react';
import './Form.css';
import { allStates } from '../util/data'

interface IState {
    allStates: string[],
    selectedState: string,
    selecetedCity: string,
    allCitiesInState: string[],
}
function Form(){
    const [selectedState, setSelectedState ] =useState('')
    const [allCitiesInState, setAllCitiesInState ] = useState([])
    const [selectedCity, setSelectedCity ] = useState('')
    const [citiesError, setCitiesError ] = useState(false)

const stateOptions = allStates.map((state, index) => {
    return (<option key={index} value={state}>{state}</option>)
})

const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedState(e.target.value)
}


return (
    <section>
    <form>
      <select value={selectedState} onChange={e => handleStateChange(e)}>
        <option value=''>- Select a State -</option>
        { stateOptions }
      </select>
      <select value={selectedCity} onChange={event => console.log(event)}>
        <option value=''>Select a City</option>
        {/* { cityOptions } */}
      </select>
      <input type="submit" value="Show AQI" />   
    </form>
    <button onClick={event => console.log(event)}>Reset Form</button>
  </section>
)
}

export default Form