import React, { Component } from 'react'
import { transpileModule } from 'typescript'
import './App.css'
import Form from '../Form/Form'

interface IState {
  selectedState: string
  allCitiesInState: string[]
  selectedCity: string
  selectedCityData: {
    city: string
    aqi: number
    timeStamp: string
    temperature: number
    location: number[]
  }
  otherCitiesData: {
    city: string
    aqi: number
    timeStamp: string
    temperature: number
    location: number[]
  }[]
  getSelectedCityDataError: string
  getAllCitiesInStateDataError: string
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      selectedState: '',
      allCitiesInState: [],
      selectedCity: '',
      selectedCityData: {
        city: '',
        aqi: 0,
        timeStamp: '',
        temperature: 0,
        location: []
      },
      otherCitiesData: [{
        city: '',
        aqi: 0,
        timeStamp: '',
        temperature: 0,
        location: []
      }],
      getSelectedCityDataError: '',
      getAllCitiesInStateDataError: ''
    }
  }

  setData = (e: React.MouseEvent<HTMLButtonElement>) => {
   
  }

  getSelectedCityData = () => {

  }

  getAllCitiesInStateData = () => {
  
  }

  render = () => {
    return (
      <main>
        <h1>Breezy</h1>
        <h2>-Breathe Easy.-</h2>
        <p>Find the cleanest air around.</p>
        <Form setData= {this.setData}/>
        {/* <SelectedCity />
        <FindCleanestAir /> */}
      </main>
    )
  }
}

export default App

// interface IProps {

// }
// function SelectedCity ({prop1, prop2, prop3}): IProps> {
