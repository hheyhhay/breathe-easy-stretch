import React, { useState, useEffect } from 'react'
// import { transpileModule } from 'typescript'
import './App.css'
import { getData } from '../../util/apiCalls';
import { cleanCityData } from '../../util/dataCleaning'
import Form from '../Form/Form'

// interface IState {
//   selectedState: string
//   allCitiesInState: string[]
//   selectedCity: string
//   selectedCityData: {
//     city: string
//     aqi: number
//     timeStamp: string
//     temperature: number
//     location: number[]
//   }
//   otherCitiesData: {
//     city: string
//     aqi: number
//     timeStamp: string
//     temperature: number
//     location: number[]
//   }[]
//   getSelectedCityDataError: string
//   getAllCitiesInStateDataError: string
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
  const [currentOtherCity, setCurrentOtherCity] = useState<string>('')
  const [otherCitiesData, setOtherCitiesData] = useState<[]>([])
  const [cityDataError, setCityDataError] = useState<string>('')
  const [otherCitiesDataError, setOtherCitiesDataError] = useState<string>('')  

  useEffect(() => {
    if (selectedCity) {
      getSelectedCityData()
    }
  }, [selectedCity])

  useEffect(() => {
    if (currentOtherCity) {
      getCurrentOtherCityData()
    }
  }, [currentOtherCity])

  const setData = async (event: any, selectedState: any, selectedCity: any) => {
    event.preventDefault()

    setSelectedState(selectedState)
    setSelectedCity(selectedCity)
  }

  const getSelectedCityData = () => {
    getData(`http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => setSelectedCityData(data))
      .catch(error => setCityDataError(error.message))
  }

  const getCurrentLocationData = () => {
    getData(`http://api.airvisual.com/v2/nearest_city?key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => setSelectedCityData(data))
      .catch(error => setCityDataError(error.message))
  }

  const getCurrentOtherCityData = () => {
    getData(`http://api.airvisual.com/v2/city?city=${currentOtherCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
      .then(data => cleanCityData(data))
      .then(data => setOtherCitiesData(...otherCitiesData, data))
      .catch(error => setOtherCitiesDataError(error.message))
  }

  return (
    <main>
      <h1>Breezy</h1>
      <h2>-Breathe Easy.-</h2>
      <p>Find the cleanest air around.</p>
        <button onClick={event => getCurrentLocationData(event: React.MouseEvent)}>Use Current Location</button>
      <Form setData= {setData}/>
     
    </main>
  )
}

export default App;

//  {/* <section>
//         <SelectedCity />
//         <FindCleanestAir />
//       </section> */}