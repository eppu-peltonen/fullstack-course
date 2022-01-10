import React, {useState, useEffect} from 'react'
import {CountryFilterInput, CountryInfoView} from "./components/Countries"
import axios from 'axios'

const App = () => {
  
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setCountryFilter(event.target.value)
  }
  
  return (
    <div>
      <CountryFilterInput countryFilter={countryFilter} handleInputChange={handleInputChange} />
      <CountryInfoView
        countries={countries}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        />
    </div>
  )
}

export default App;
