import React, { useState, useEffect } from 'react'
import { nodeModuleNameResolver, transpileModule } from 'typescript'
import './App.css'
import Form from '../Form/Form'
// import { getCurrentOtherCityData, getCurrentLocationData, getSelectedCityData } from '../apiCalls'
import {} from '../apiCalls';

export interface cityData { // reaname to cityObject
  city: string
  aqi: number
  timeStamp: string
  temperature: number
  location: number[]
}

const App = () => {
  //Set states using Hooks
  const [selectedCitiesInState, setSelectedCitiesInState] =useState<cityData[]>([]) //comes from fetch
  const [selectedState, setSelectedState] =useState('') 
  // const [otherCitiesData, setOtherCitiesData] =useState<cityData[]>([])
  const [allCitiesInState, setAllCititesInState] =useState([]); // use clean function to turn objects into an array from API call
  const [cityDataError, setCityDataError] =useState('');
  const [selectedCity, setSelectedCity] = useState<cityData[]>([])
  const [otherCitiesData, setOtherCitiesData] = useState([])

  const handleClick=(e: React.MouseEvent<HTMLButtonElement> ) => {
    // getCurrentLocationData(e.target)
    console.log(e.target)
  }
  return (
    <main>
      <h1>Breezy</h1>
      <h2>-Breathe Easy.-</h2>
      <p>Find the cleanest air around.</p>
        <button onClick={handleClick}>Use Current Location</button>
      <Form />
    </main>
  )
}

export default App;
