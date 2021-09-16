import React, { useState, useEffect } from 'react';
import './Form.css';
import { allStates } from '../util/data'
import { getCityList } from '../apiCalls'
import { cleanCityData, cleanAllCitiesData } from '../util/dataCleaning'
import { isPropertySignature } from 'typescript';


const Form = (props: any ) => {
    const [selectedState, setSelectedState ] =useState('')
    const [allCitiesInState, setAllCitiesInState ] = useState<string[]>([''])
    const [selectedCity, setSelectedCity ] = useState('')
    const [citiesError, setCitiesError ] = useState(false)

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
    <form onSubmit={event => props.setData(event, selectedState, selectedCity)}>
      <select value={selectedState} onChange={e => handleStateChange(e)}>
        <option value=''>- Select a State -</option>
        { stateOptions }
      </select>
      <select value={selectedCity} onChange={e => handleCityChange(e)}>
        <option value=''>Select a City</option>
        { cityOptions }
      </select>
      <input type="submit" value="Show AQI" />   
    </form>
    <button onClick={event => console.log(event)}>Reset Form</button>
  </section>
)
}

export default Form