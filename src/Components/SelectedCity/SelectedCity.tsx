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
            { selectedCityData.aqi && <h3 className='aqi-value'>{`${selectedCityData.aqi} AQI`}</h3> }
            <p className='select-prompt'>Pick a city to compare</p>
            <Link to={`/`}>
                <button className='home-button'>Return Home</button>
            </Link>
        </section>
    )
}

export default SelectedCity;