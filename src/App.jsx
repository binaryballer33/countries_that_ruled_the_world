import { useEffect, useState } from 'react'
import { data } from './assets/data'
import './App.css'

function App() {
  // state variables and data from assets/data.js
  const historicalPowers = data.historicalPowers
  const [searchBox, setSearchBox] = useState("")
  const [filteredHistoricalPowers, setFilteredHistoricalPowers] = useState(historicalPowers)
  const [featuredCountry, setFeaturedCountry] = useState(historicalPowers[0])
  
  useEffect(() => {
    setFilteredHistoricalPowers(historicalPowers.filter((country) => country.country.toLocaleLowerCase().includes(searchBox.toLocaleLowerCase())))
  }, [searchBox, historicalPowers])

  return (
    <div className='pageContainer'>
      {/* search box component that updates state of the search box whenever someone types into it */}
      <div className='searchBoxContainer'>
        <label htmlFor='search'>Search: </label>
        <input type='text' className='searchBox' placeholder="filter out historical powers here" onChange={(e) => setSearchBox(e.target.value)}/>
      </div>

      {/* historical powers component with conditional rendering */}
      <div className='historicalPowersContainer'>
        {filteredHistoricalPowers.length !== 0 
          ? filteredHistoricalPowers.map((country) => (
            <div key={country.country} onClick={() => setFeaturedCountry(country)}>
              <h1>{country.country}</h1>
              <p>{country.description}</p>
            </div>
            )) 
          : "There's Nothing Here That Matches Your Search Criteria"
        }
      </div>
      
      {/* featured country component that changes to the last country that was clicked */}
      <div key={featuredCountry.country} style={{ color: 'lightblue', textAlign: 'center', width: '60%'}}>
            <h1>{featuredCountry.country}</h1>
            <p>{featuredCountry.description}</p>
            <p><span style={{color: 'green'}}>Fact: </span>{featuredCountry.fact}</p>
            <p><span style={{color: 'green'}}>Additional Info: </span>{featuredCountry.additionalInfo}</p>
      </div>    
    </div>
  )
}

export default App
