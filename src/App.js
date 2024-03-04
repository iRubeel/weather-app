import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaLocationArrow, FaSearch, FaWind, FaTint, FaThermometerThreeQuarters, FaSunrise, FaSunset } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import { useSpring, animated } from 'react-spring';
import { AppWrap } from './styledComponents';
import CloudAnimation from './CloudAnimation';
import ClearAnimation from './ClearAnimation';
import RainAnimation from './RainAnimation';
import SnowAnimation from './SnowAnimation';
import ForecastChart from './ForecastChart'; // Ensure this component is created
import HourlyForecastCard from './HourlyForecastCard'; // Adjust the path as necessary
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import { FaThermometerHalf } from 'react-icons/fa';
// Use FaSun for both sunrise and sunset as a workaround


import './App.css';

const api = {
  key: "718b00cd7b1f42663f235d426db9cba0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const cardAnimation = useSpring({
    to: { opacity: 1, transform: 'translateY(0)' },
    from: { opacity: 0, transform: 'translateY(-20px)' },
    reset: true,
    delay: 200,
  });

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });

      // Fetch and process forecast data
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        
        .then(result => {
          if (result && result.list) {
            const processedForecast = result.list.map(item => ({
              time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              icon: item.weather[0].icon,
              temp: Math.round(item.main.temp),
              windSpeed: `${item.wind.speed} km/h`,
              precipitation: `${Math.round(item.pop * 100)}%` // Assuming 'pop' is the probability of precipitation
            }));
            setForecast(processedForecast);
          } else {
            // Handle cases where the expected data isn't present
            console.error("Forecast data is not in the expected format:", result);
            setForecast([]); // Reset or keep the forecast as an empty array
          }
        })
        .catch(error => {
          console.error("Error fetching forecast data:", error);
          setForecast([]); // Ensure forecast is reset or remains an empty array on error
        });
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clouds':
        return <WiCloudy size={48} />;
      case 'Rain':
        return <WiRain size={48} />;
      case 'Snow':
        return <WiSnow size={48} />;
      case 'Clear':
      default:
        return <WiDaySunny size={48} />;
    }
  };

  const getWeatherAnimation = (main) => {
    switch (main) {
      case 'Clouds':
        return <CloudAnimation />;
      case 'Clear':
        return <ClearAnimation />;
      case 'Rain':
        return <RainAnimation />;
      case 'Snow':
        return <SnowAnimation />;
      default:
        return null; // Return null or a default animation for unhandled conditions
    }
  };

  return (
    <AppWrap theme={theme}>
      <div className={`App-wrap ${theme}`}>
        <div className="theme-toggle-button" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </div>
        <div className="app-title">Weatherly</div>
        <div className="search-box">
          <FaLocationArrow className="location-icon" onClick={() => console.log("Current location functionality here.")} />
          <input 
            type="text"
            className="search-bar"
            placeholder="Search for places..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <FaSearch className="search-icon" onClick={() => search({ key: 'Enter' })} />
        </div>
        {(typeof weather.main != "undefined") && (
          <animated.div style={cardAnimation} className="weather-card">
            {/* Location and Date Section */}
            <div className="weather-section">
              <div className="section-item">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">
                  {
                    new Date().toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  }
                </div>
              </div>
            </div>
  
            {/* Temperature and Weather Condition Section */}
            <div className="weather-section">
              <div className="section-item">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
              <div className="section-item">
                {getWeatherAnimation(weather.weather[0].main)}
              </div>
            </div>            
  
            {/* Sunrise and Sunset Section with Icons */}
            <div className="weather-section">
  <div className="section-item">
    <FaSun size={20} />{" "}
    <span>Sunrise {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
  </div>
  <div className="section-item">
    <FaSun size={20} />{" "}
    <span>Sunset {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
  </div>
</div>

<div className="weather-section">
  <div className="section-item">
    <FaWind size={20} />{" "}
    <span>Wind {weather.wind.speed} km/h</span>
  </div>
  <div className="section-item">
    <FaTint size={20} />{" "}
    <span>Humidity {weather.main.humidity}%</span>
  </div>
  <div className="section-item">
    <FaThermometerHalf size={20} />{" "}
    <span>Pressure {weather.main.pressure} hPa</span>
  </div>
</div>


          </animated.div>
        )}
        {/* Test Hourly Forecast Card with Hardcoded Data */}
        {Array.isArray(forecast) && forecast.length > 0 && (
          <div className="hourly-forecast-background">
            {forecast.map((hour, index) => (
              <HourlyForecastCard key={index} hour={hour} />
            ))}
          </div>
        )}
      </div>
    </AppWrap>
  );
  
}

export default App;
