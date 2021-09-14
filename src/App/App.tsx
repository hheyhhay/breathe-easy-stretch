import React, { Component } from 'react'
import { transpileModule } from 'typescript'
import './App.css'

interface IState {
  allCitiesInStateData: {
    city: string
    state: string
    country: string
    location: {
      type: string
      coordinates: number[]
    }[]
  // {"city":"Los Angeles","state":"California","country":"USA","location":{"type":"Point","coordinates":[-118.2417,34.0669]}
  
  selectedCity: string
  error: string
  mainPage: boolean
}
// interface IProps {

// }
// function SelectedCity ({prop1, prop2, prop3}): IProps> {

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
 
      selectedState: '',
      allCitiesInState: [],
      allCitiesInStateData: [{

      }],
      selectedCity: '',
      error: '',
      mainPage: true
    }
  }

  componentDidMount = () => {
    //setCardsShow = false 
   
  }

  getCityData = () => {

  }

  setLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    // this.setState({allCitiesInState: }) --> example
    //Take currentlocation and use API call to find  city and data 
  }

  render = () => {
    return (
      <main>
        <h1>Breezy</h1>
        <h2> -BREATHE EASY- </h2>
        <p> Find the cleanest air around</p>
        <button
          onClick={() => this.setLocation(e)}>
          Use current location
        </button>
        <p>or</p>
        <Form />
      </main>
    )
  }
}

export default App