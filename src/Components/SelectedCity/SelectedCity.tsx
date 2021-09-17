import React from 'react'
import './SelectedCity.css'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { CleanData } from '../../util/dataCleaning';


interface Props {
    selectedCityData: CleanData

}
const SelectedCity: React.FC<Props> = ( {selectedCityData} ) => {
    return (
        <section>
         <p> I'm in </p>
        <h2>{`${selectedCityData.city}, ${selectedCityData.state}`} </h2>
        <p>Current Air Quality</p>            <p>Last Updated {dayjs(selectedCityData.timeStamp).format('MM/DD/YYYY')} </p>
         <h3>{`${selectedCityData.aqi} AQI`}</h3>
        <p>Pick city to compare:</p>
        <Link
        to={`/`}
        >
        <button>Return Home</button>
      </Link>
    </section>
    )
}

export default SelectedCity