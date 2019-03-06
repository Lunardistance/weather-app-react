import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=";
const API_KEY = "c68f6eafc3f5ed0f205ea4eea76ec796";
const PATH_SEARCH = '/search';
const PARAM_SEARCH = "query=";

const weather = [
  {
   day: "Monday", 
   high: 70,
   low: 50,
   skies:"scattered-showers",
   precipitation: "Scattered Showers",
   hourly: {
     0:59,1:58,2:57,3:56,4:55,5:54,6:53,
     7:52,8:51,9:53,10:54,11:59,12:65,13:70,
     14:70,15:69,16:67,17:64,18:62,19:60,
     20:59,21:58,22:57,23:54
   }
  },
  {
    day: "Tuesday", 
    high: 70,
    low: 50,
    skies:"sunny",
    precipitation: "none",
    hourly: {
      0:59,1:58,2:57,3:56,4:55,5:54,6:53,
      7:52,8:51,9:53,10:54,11:59,12:65,13:70,
      14:70,15:69,16:67,17:64,18:62,19:60,
      20:59,21:58,22:57,23:54
    }
  },
  {
    day: "Wednesday", 
    high: 70,
    low: 50,
    skies:"partly-cloudy",
    precipitation: "none",
    hourly: {
      0:59,1:58,2:57,3:56,4:55,5:54,6:53,
      7:52,8:51,9:53,10:54,11:59,12:65,13:70,
      14:70,15:69,16:67,17:64,18:62,19:60,
      20:59,21:58,22:57,23:54
    }
  },
  {
    day: "Thursday", 
    high: 70,
    low: 50,
    skies:"mostly-cloudy",
    precipitation: "none",
    hourly: {
      0:59,1:58,2:57,3:56,4:55,5:54,6:53,
      7:52,8:51,9:53,10:54,11:59,12:65,13:70,
      14:70,15:69,16:67,17:64,18:62,19:60,
      20:59,21:58,22:57,23:54
    }
  },
  {
    day: "Friday", 
    high: 70,
    low: 50,
    skies:"thunderstorms",
    precipitation: "Heavy Showers",
    hourly: {
      0:59,1:58,2:57,3:56,4:55,5:54,6:53,
      7:52,8:51,9:53,10:54,11:59,12:65,13:70,
      14:70,15:69,16:67,17:64,18:62,19:60,
      20:59,21:58,22:57,23:54
    }
  }
];

const Header = ({greeting}) => {
 greeting = "5-Day Forecast";
  return(
  <div className = "header-row">
    <span className = "headline"><h1>{greeting}</h1></span>
  </div>
  )
};

const Button = ({onClick, className, children}) => (
  <div onClick={onClick} className={className} type="button">
  {children}
  </div>
)



var hours = weather.map(item => (item.hourly))


var hourlee = hours.map(item =>(item))
console.log(hourlee);

console.log(JSON.stringify(hourlee));


const HourlyTable = ({hours}) => (
  <div className = "hourly-table">
  {hours.foreach(prop => prop[1](
      <div className = "table-column">
      <div className ="hour">{prop}</div>
    </div>
  ))}

    )}

  </div>
)




const WeatherTable = ({weather, onHourly}) => {
  const onHourly = (day) => {
    const notDate = item =>item.day !== day;
    const dayForHourly = hours.filter(notDate);
  return(
    <div>
   </div>
  )
    } 
  return(
  <div className = "weather-table">

    {weather.map(item => ( 
      <div key={item.day} className = "table-column">
        <div className = "day">{item.day}</div>
        <div className = "high">{item.high}</div>
        <div className = "day"><img src={"../images/" + item.skies + ".png"}/></div>
        <div className = "low">{item.low}</div>
        <Button onClick={() => onHourly(item.day)}
          className="hourly-button" type="button"
          >
          See Hourly
          </Button>
      </div>
    ))}
  </div>
  )
}



class App extends Component {
// constructor(props) {
  // super(props);

  // this.onHourly =  this.onHourly.bind(this);
  // this.componentDidMount =  this.componentDidMount.bind(this);
// }
// componentDidMount() {
  
//   fetch(`${PATH_BASE}${API_KEY}`)
//   .then(response => response.json())
//   .catch(error => error);

// }



  render() {
    console.log();

    return (
      <div className="App">
        <Header />
        <WeatherTable weather={weather}/>
        
      </div>
    );
  }
}

export default App;
