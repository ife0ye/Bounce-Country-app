import React, { useState } from 'react';
import './App.css'; 
import axios from 'axios'; 


function App() {
  const [countryName, setCountryName] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/country?name=${countryName}`);
      console.log(response); 
      if (response.status === 200) {
        const data = response.data[0]; 
        setCountryInfo(data); 
        setError('');
      } else {
        setError('Country not found');
        setCountryInfo(null);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
      setCountryInfo(null);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Country Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a country name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Get Information
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {countryInfo && (
        <div className="mt-4">
          <img
            src={countryInfo.flags && countryInfo.flags.png}
            alt={`Flag of ${countryInfo.name && countryInfo.name.common}`}
            className="img-fluid"
          />
          <p>
            
          </p>
          <p>
            <strong>Country Name:</strong> {countryInfo.name && countryInfo.name.common}
          </p>
          <p>
            <strong>Official Name:</strong> {countryInfo.name && countryInfo.name.official}
          </p>
          <p>
            <strong>Region:</strong> {countryInfo.region}
          </p>
          <p>
            <strong>Population:</strong> {countryInfo.population}
          </p>
          <p>
            <strong>Capital:</strong> {countryInfo.capital && countryInfo.capital[0]}
          </p>
          {countryInfo.currencies && (
            <div className='currency'>
              <strong>Currencies:</strong>
              {Object.keys(countryInfo.currencies).map((currencyCode) => (
                <p key={currencyCode}>
                  {countryInfo.currencies[currencyCode].name}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


