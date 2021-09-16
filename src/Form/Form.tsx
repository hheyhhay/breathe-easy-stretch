import React, { useState, useEffect } from 'react';
import './Form.css';
import { allStates } from '../util/data'
import { getData } from '../apiCalls'
import { cleanCityData, cleanAllCitiesData } from '../util/dataCleaning'

interface IState {
    allStates: string[],
    selectedState: string,
    selecetedCity: string,
    allCitiesInState: string[],
}
type City = { city: string}
function Form(){
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
    getData(`http://api.airvisual.com/v2/cities?state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
    .then(data => cleanAllCitiesData(data))
    .then(data => setAllCitiesInState(data))
}

const stateOptions = allStates.map((state, index) => {
    return (<option key={index} value={state}>{state}</option>)
})
const cityOptions = allCitiesInState.map((city, index) => {
    return (<option key={index} value={city}>{city}</option>)
})

const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedState(e.target.value)
}

const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    console.log(e.target.value)
}


return (
    <section>
    <form>
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