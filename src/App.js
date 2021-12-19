import {useState} from 'react';

const api = {
  key:  "398e615a680a225261a32b43b3d9dd33",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        // console.log(result);
      });
    }
  }
  
  if(weather.main !== undefined){
    // var sunRise = weather.sys.sunrise;
    // var sunSet = weather.sys.sunset;
    // console.log(new Date(sunRise),new Date(sunSet));
    // console.log(new Date(sunRise),sunSet);
    var city = weather.name;
    var sky = weather.weather[0].main;
    var humidity = weather.main.humidity;
    var country = weather.sys.country;
    var temp = Math.round(weather.main.temp);
  }
  

  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let month = months[d.getMonth()]
    let date = d.getDate();
    let year = d.getFullYear();
    
    return `${day}, ${month} ${date}, ${year}`;
  }
  
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..." 
            onChange={e => setQuery(e.target.value)} 
            value = {query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="location-box">
          <div className="location">
            {city}
            <b> {country}</b>
          </div>
          <div className="date">
            {dateBuilder(new Date())}<br></br>
          </div>
          <div className="weather-box">
            <div className="temp">
              {temp}
              °C
            </div>
            <div className="weather">
              {sky} <br></br>
              Humidity {humidity}%
            </div>
          </div>
        </div>):("")}
      </main>
    </div>
  );
}

export default App;
