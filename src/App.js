import './App.css';

const api ={
  key: "718b00cd7b1f42663f235d426db9cba0",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt)
{
  if( evt.keyCode == 13 )
  {
    getResults(searchBox.value);
  }
}

function getResults(query)
{
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather)
{
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = createDate(now);

  let DegreeSymbol = document.querySelector('.current .temp');
  DegreeSymbol.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherElement = document.querySelector('.current .weather');
  weatherElement.innerText = weather.weather[0].main;

  let HiLow = document.querySelector('.hi-low');
  HiLow.innerText = `${weather.main.temp_min} °C / ${weather.main.temp_max} °C`;
}

function createDate(Date)
{
  let months = ["January", "Febuary", "March", "April", "May", "June", "July",
   "Augest ","September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thrusday", "Friday", "Saturday"];

  let day = days[Date.getDay()];
  let date = Date.getDate();
  let month = months[Date.getMonth()];
  let year = Date.getFullYear();

  return `${day} ${date} ${month} ${year}`; 
}

function App() {
  return (
    <div className="App"></div>
    
  );
}

export default App;
