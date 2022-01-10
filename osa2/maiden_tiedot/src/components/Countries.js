import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const CountryFilterInput = ({countryFilter, handleInputChange}) => {
  return (
    <div>
      Find countries: <input value={countryFilter} onChange={handleInputChange} />
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {Object
          .keys(country.languages)
          .map(obj =>
            <li key={country.languages[obj]}>{country.languages[obj]}</li>
          )
        }
      </ul>
      <img src={country.flags.png} alt="country flag" width="200" />
      <Weather capital={country.capital}  />
    </div>
  )
}

const CountryInfoView = ({countries, countryFilter, setCountryFilter}) => {
  const countriesToShow = countryFilter
  ? countries
    .filter(country => 
      country.name.common
        .toLowerCase()
        .indexOf(countryFilter.toLowerCase()) > -1)
      : countries

  if (countriesToShow.length > 10) {
    return 'Too many matches, specify another filter'
  } else if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />
  } else
  return (
    <div>
      {countriesToShow.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <Button clickHandler={() => setCountryFilter(country.name.common)} text="show" />
        </div>)}
    </div>
  )
}

const Weather = ({capital}) => {
  
  const [currentWeather, setWeather] = useState({})
  
  useEffect(() => {
    const params = {
      q: capital[0],
      appid: process.env.REACT_APP_WEATHER_KEY,
      units: "metric"
    }
    axios
    .get('http://api.openweathermap.org/data/2.5/weather', {params})
    .then(response => {
      setWeather(response.data.main)
    })
  }, [capital])

  const main = Object.values(currentWeather)
  const temp = main[0]
  const feelsLike = main[1]
  const humidity = main[5]

  if (currentWeather === undefined) {
    return (
      <p>No weather info returned</p>
    )
  } else {
  return (
    <div>
      <h3>Weather in {capital[0]}</h3>
      <p>temperature: {temp} °C</p>
      <p>feels like: {feelsLike} °C</p>
      <p>humidity: {humidity} %</p>
    </div>
  )
  }
}

export {
  CountryFilterInput,
  Country,
  CountryInfoView
}
