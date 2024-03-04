import React from 'react';

// A functional component that displays weather data for a single hour
function HourlyForecastCard({ hour }) {
  // Destructuring the necessary data from the hour prop
  const { time, icon, temp, windSpeed, precipitation, visibility } = hour;

  return (
    <div className="hourly-forecast-card">
      <div className="hourly-time">{time}</div>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather icon" className="weather-icon" />
      <div className="hourly-temp">{temp}°C</div>
      {windSpeed && <div className="hourly-wind">Wind: {windSpeed} </div>}
      {precipitation && <div className="hourly-precipitation">Precip: {precipitation}</div>}
      {visibility && <div className="hourly-visibility">Visibility: {visibility} </div>}
    </div>
  );
}


export default HourlyForecastCard;
