import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Weather = ({ capital }) => {

  const api_key = process.env.REACT_APP_API_KEY
  
  const [ weather, setWeather ] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.weatherbit.io/v2.0/current?city=${capital}&key=${api_key}`)
      .then((response) => {
        setWeather(response.data)
      })
      .catch(err => console.log(err))
  }, [capital, api_key])

  return (
    <div>
        {
          weather.data === undefined
          ? ""
          : 
            <div>
              <p>{ `Temperature: ${weather.data[0].temp} Celsius` }</p>
              <p>{ `Wind: ${weather.data[0].wind_spd} m/s` }</p>
              <img alt="weather" src={`https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`} ></img>
              <p>{weather.data[0].weather.description}</p>
            </div>
        }
    </div>
  )
}


export default Weather;