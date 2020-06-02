import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather'



function App() {

  const [ countries, setCountries ] = useState([]);
  const [ input, setInput ] = useState('');


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  const handleInput = (e) => {
    setInput(e.target.value);
  }
 
  const countriesToShow = countries.filter((country) => {
    return country.name.toLowerCase().includes(input.toLowerCase())
    }); 
    

  return (
    <div>
      <input placeholder='country' onChange={handleInput}></input>
      <h3>
      {
        countriesToShow.length === 1
        ? countriesToShow.map((country) => {
              return (
                <div key={country.name}>
                  <p>{country.name}</p>
                  <img alt="Country flag" src={country.flag} style={{width: '5rem'}}></img>
                  <p>Population: {country.population.toLocaleString()}</p>
                  <p>Capital: {country.capital}</p>
                  <p>Languages:</p>
                  <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
                  <Weather  capital={country.capital}/>
                </div>
              )
        })
        :
          countriesToShow.length > 10 
          ? "Too many results"
          : countriesToShow.map((country) => {
              return (
                <div key={country.name}>
                  <p>{country.name}</p><button onClick={() => {setInput(country.name)}}>Show</button>
                </div>
              )
        })
      }
      </h3>
    </div>    
  );
}

export default App;
