import React from 'react';
import './SelectedCity.css';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { CleanData } from '../../util/dataCleaning';

interface Props {
    selectedCityData: CleanData
}

const SelectedCity: React.FC<Props> = ( {selectedCityData} ) => {
    return (
            <section className='selected-city-card'>
            <p className='location-title'>I'm in</p>
            <h2 className='location-info'>{`${selectedCityData.city}, ${selectedCityData.state}`}</h2>
            <p className='aqi-title'>Current Air Quality</p>            
            <p className='aqi-timestamp'>Last Updated {dayjs(selectedCityData.timeStamp).format('MM/DD/YYYY')}</p>
            { selectedCityData.aqi < 51 && <div><h3 className='aqi-value green'>{`${selectedCityData.aqi} AQI`}</h3><p className='aqi-rating green'>Good</p></div> }
            { (selectedCityData.aqi >= 51 && selectedCityData.aqi < 101) && <div><h3 className='aqi-value yellow'>{`${selectedCityData.aqi} AQI`}</h3>
                <p className='aqi-rating yellow'>Moderate</p></div> }
            { (selectedCityData.aqi >= 101 && selectedCityData.aqi < 151) && <div><h3 className='aqi-value orange'>{`${selectedCityData.aqi} AQI`}</h3>
                <p className='aqi-rating orange'>Sensitive</p></div>}
            { selectedCityData.aqi >= 151 && <div><h3 className='aqi-value red'>{`${selectedCityData.aqi} AQI`}</h3>
                <p className='aqi-rating red'>Unhealthy</p></div> }
            <p className='select-prompt'>Pick a city to compare</p>
            <Link to={`/`}>
                <button className='home-button'>Return Home</button>
            </Link>
            </section>
        
    )
}

export default SelectedCity;