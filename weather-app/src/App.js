import hot from './assets/hot.jpg';
import cold from './assets/cold.jpg';
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(cold);


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      // console.log(data)
      setWeather(data);

      // dynamic background
      const treshold = units === 'metric' ? 20 : 60;
      if(data.temp <= treshold) setBg(cold);
      else setBg(hot);
    };
    fetchWeatherData();

  },[units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);

    }
  } 

  return (
    <div className="App" style={{ backgroundImage:`url(${bg})` }}>

      <div className="overlay">
        {
          weather && (
            <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..."></input>
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>

          <div className="section section__temperature">
            <div className="icon">
              <h3> {`${weather.name}, ${weather.country}`} </h3>
              <img src={weather.iconURL} alt="weaterIcon"></img>
              <h3>{weather.description}</h3>
            </div>
            <div className="temprature">
              <h1>{`${weather.temp.toFixed()} ° ${units === "metric" ? "C" : "F" }`}</h1>
            </div>
          </div>
          <Descriptions weather={weather} units={units}></Descriptions>
        </div>

          )
        }
        
      </div>

    </div>
  );
}

export default App;



