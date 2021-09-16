import React, { useState, useEffect } from 'react'
// import { nodeModuleNameResolver, transpileModule } from 'typescript'
import './App.css'
import Form from '../Form/Form'
// import { getCurrentOtherCityData, getCurrentLocationData, getSelectedCityData } from '../apiCalls'
import { cleanCityData } from '../util/dataCleaning'
import { getCityData } from '../apiCalls';

// export interface cityData { // reaname to cityObject
//   city: string
//   aqi: number
//   timeStamp: string
//   temperature: number
//   location: number[]
// }

// const App = () => {
  // //Set states using Hooks
  // const [selectedCitiesInState, setSelectedCitiesInState] =useState<cityData[]>([]) //comes from fetch
  // const [selectedState, setSelectedState] =useState('') 
  // const [allCitiesInState, setAllCititesInState] =useState([]); // use clean function to turn objects into an array from API call
  // const [cityDataError, setCityDataError] =useState('');
  // const [selectedCity, setSelectedCity] = useState<cityData[]>([])
  // const [otherCitiesData, setOtherCitiesData] = useState([])

  // const handleClick=(e: React.MouseEvent<HTMLButtonElement> ) => {
  //   // getCurrentLocationData(e.target)
  //   console.log(e.target)
  // }

  interface SelectedCity {
    city: string
    aqi: number
    timeStamp: string
    temperature: number
    location: number[]
  }
  
const App: React.FunctionComponent = () => {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedCityData, setSelectedCityData] = useState<SelectedCity | {}>({})  
  // const [currentOtherCity, setCurrentOtherCity] = useState<string>('')
  // const [otherCitiesData, setOtherCitiesData] = useState<SelectedCity[] | []>([])
  const [cityDataError, setCityDataError] = useState<string>('')
  // const [otherCitiesDataError, setOtherCitiesDataError] = useState<string>('')  

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

  const setData = async (event: React.MouseEvent, selectedState: string, selectedCity: string) => {
    event.preventDefault()

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

  return (
    <main>
      <h1>Breezy</h1>
      <h2>-Breathe Easy.-</h2>
      <p>Find the cleanest air around.</p>
        <button onClick={() => getCurrentLocationData()}>Use Current Location</button>
      <Form />
    </main>
  )
}

export default App;
