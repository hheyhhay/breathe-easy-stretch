import React, { useState, useEffect } from 'react'
import { nodeModuleNameResolver, transpileModule } from 'typescript'
import './App.css'
import Form from '../Form/Form'
// import { getCurrentOtherCityData, getCurrentLocationData, getSelectedCityData } from '../apiCalls'
import {} from '../apiCalls';
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
  // useEffect(() => {
  //   if (selectedCity) {
  //     getSelectedCityData()
  //   }
  // }, [selectedCity])

  // const setData = async (event, selectedState, allCitiesInState, selectedCity) => {
  //   event.preventDefault()

  //   setSelectedState(selectedState);
  //   setAllCititesInState(allCitiesInState)
  //   setSelectedCity(selectedCity)
  // }

  // const getSelectedCityData = () => {
  //   fetch(`http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
  //   .then(response => response.json())
  //   .then(data => setSelectedCity(data.data))
  //   .catch(error => setCityDataError(error.message))
  //}
  // const getCurrentLocationData = () => {
  //   fetch(`http://api.airvisual.com/v2/nearest_city?key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
  //     .then(response => response.json())
  //     .then(data => setSelectedCityData(data.data))
  //     .catch(error => setCityDataError(error.message))
  // }

  // const getCurrentOtherCityData = () => {
  //   fetch(`http://api.airvisual.com/v2/city?city=${currentOtherCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
  //     .then(response => response.json())
  //     .then(data => setOtherCitiesData(...otherCitiesData, data.data))
  //     .catch(error => setOtherCitiesDataError(error.message))
  // }
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


// class App extends React.Component<{}, IState> {
//   constructor(props: {}) {
//     super(props)
//     this.state = {
//       selectedState: '',
//       allCitiesInState: [],
//       selectedCity: '',
//       selectedCityData: {
//         city: '',
//         aqi: 0,
//         timeStamp: '',
//         temperature: 0,
//         location: []
//       },
//       otherCitiesData: [{
//         city: '',
//         aqi: 0,
//         timeStamp: '',
//         temperature: 0,
//         location: []
//       }],
//       getSelectedCityDataError: '',
//       getAllCitiesInStateDataError: ''
//     }
//   }

//   setData = (e: React.MouseEvent<HTMLButtonElement>) => {
   
//   }

//   getSelectedCityData = () => {

//   }

//   getAllCitiesInStateData = () => {
  
//   }

//   render = () => {
//     return (
//       <main>
//         <h1>Breezy</h1>
//         <h2>-Breathe Easy.-</h2>
//         <p>Find the cleanest air around.</p>
//         <Form setData= {this.setData}/>
//         {/* <SelectedCity />
//         <FindCleanestAir /> */}
//       </main>
//     )
//   }
// }

// export default App

// // interface IProps {

// // }
// // function SelectedCity ({prop1, prop2, prop3}): IProps> {
