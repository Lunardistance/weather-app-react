import React, { Component } from 'react';
import './App.css';

const PATH_BASE_WEATHER = "http://api.openweathermap.org/data/2.5/forecast?";
const CITY_FOR_SEARCH_WEATHER = 'Miami'
const APP_ID_WEATHER = '&APPID='
const API_KEY_WEATHER = "c68f6eafc3f5ed0f205ea4eea76ec796";
const LAT_ROOT = 'lat=';
const LONG_ROOT = 'lon=';



const DEFAULT_QUERY = '33127';
const PATH_BASE_MAPS = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:";
const KEY_APPENDER = '&key='
const API_KEY_MAPS = "AIzaSyAsM3hCw8nC4DAPsLFWt9enisL9HbUplrs";


const Search = ({ value, onChange, onSubmit, children}) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>
);

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


const WeatherTable = ({weatherResults, onHourly, checkCity}) => { 
  return(
  <div className = "weather-table">
    
    {/* {weatherResults.map(item => (  */}    
       <div className = "table-column">
       <div className = "day"></div>
        <div className = "high"></div>
        <div className = "day"><img src={"../images/" + ".png"}/></div>
        <div className = "low"></div>
        <Button onClick={() => onHourly(weatherResults.day)}
          className="hourly-button" type="button"
          >
          See Hourly
          </Button>   
    </div>
     ))
  </div>
 
)}   

class App extends Component {
constructor(props) {
  super(props);
  window.test = this;
  this.state = {
    mapResults: [],
    weatherResults: [],
    searchTerm: DEFAULT_QUERY,
    lat: LAT_ROOT,
    long: LONG_ROOT,
    weatherByDay: []
  };

  this.onSearchChange = this.onSearchChange.bind(this);
  this.fetchSearchZip = this.fetchSearchZip.bind(this);
  this.onSearchSubmit = this.onSearchSubmit.bind(this);
  this.checkCity = this.checkCity.bind(this);
  this.assignToDays = this.assignToDays.bind(this);
}


assignToDays() {
  const { weatherResults } = this.state;
  let sunday = {}
  let monday = {}
  let tuesday = {}
  let wednesday = {}
  let thursday = {}
  let friday = {}
  let saturday = {}
  for (let i = 0; i<weatherResults.list.length; i++) {

  let days = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
  
  let currentWeekDay = new Date(weatherResults.list[i].dt*1000).getDay();

statement:
switch(currentWeekDay) {
  case 0:
  days[sunday] += 'sunday'[weatherResults.list[i]]
  // days.push( days[sunday])
  break statement;

  case 1:
  days = 'monday'[weatherResults.list[i]]
  // days.push([monday])
  break statement;

  case 2:
  days =  'tuesday'[weatherResults.list[i]]
  // days.push([tuesday])

  break statement;
  case 3:
  days = 'wednesday'[weatherResults.list[i]]
  // days.push([wednesday])
  // break statement;

  case 4:
  days = 'thursday'[weatherResults.list[i]]
  // days.push([thursday])

  break statement;
  case 5:
  days =  'friday'[weatherResults.list[i]]
  // days.push(friday)

  break statement;
  case 6:
   days[saturday]=saturday[weatherResults.list[i]]
this.setState({weatherByDay:[
              days[saturday]
]})
  break statement;

  } 


// let filtered = days.filter(!Math.max(days.main.temp_max) && !Math.min(days.main.temp_max))
// this.setState({
//     weatherResults: weatherResults.list,
//     weatherByDay: 
//       days[saturday]
    
//   })
    console.log(this.state);
      // [monday]:monday,
      // [tuesday]:tuesday, 
      // [wednesday]:wednesday, 
      // [thursday]:thursday, 
      // [friday]:friday,
      // [saturday]:saturday
    

    
            

console.log(this.state)

  }
// this.setState({weatherResults: weatherResults})

}


checkCity() {
  let lat = this.state.mapResults.results.map(item => (item.geometry.location.lat))
  let long = this.state.mapResults.results.map(item => (item.geometry.location.lng))
  let latString = lat.toString()
  let longString = long.toString()

  this.setState({
    lat: latString,
  long: longString
  })
  this.fetchSearchWeather()
}

onSearchChange(e) {
  let { mapResults } = this.state
  this.setState({ searchTerm: e.target.value })
  console.log(this.state)
  console.log(mapResults.results)

}

fetchSearchZip(searchTerm) {
  fetch(
    `${PATH_BASE_MAPS}${searchTerm}${KEY_APPENDER}${API_KEY_MAPS}`
  )

  .then(response => response.json())
  .then(result => this.setState({mapResults: result}))
  .catch(error => window.alert('location not found'))
  .then(result => this.checkCity()) 
}

fetchSearchWeather(lat, long) {
  fetch(
    `${PATH_BASE_WEATHER}${LAT_ROOT}${this.state.lat}&${LONG_ROOT}${this.state.long}${APP_ID_WEATHER}${API_KEY_WEATHER}`
  )
  .then(response => response.json())
  .then(result => this.setState({weatherResults: result}))
  .catch(error=>window.alert('location not found'))
  .then(result => this.assignToDays())
}

onSearchSubmit(event) {
  let { searchTerm } = this.state;
  console.log("anything?")
  this.fetchSearchZip(searchTerm);
  event.preventDefault();  
}


// componentDidMount() {
//   // let { searchTerm } = this.state;
//   this.fetchSearchZip(this.state.searchTerm);
// }
  render() {
  const {searchTerm, mapResults, weatherResults} = this.state;
  
    return (
      <div className="App">
        <Header />
        <Search
          value={this.searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          >
          Search
          </Search>
        <WeatherTable 
        weatherResults={this.weatherResults}
        onHourly = {this.onHourly} 
        onHourly = {this.checkCity} 
        />       
      </div>
    );
  }
}

export default App;



// Date.prototype.today = function () { 
//   return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
// }

// // For the time now


// var newDate = new Date();
// var datetime = "LastSync: " + newDate.today() + " @ " + newDate.timeNow();

//To get the correct objects in API array that correspond with the 24 hour window ahead of the user
//viewing the weather, compare the unix code of the first object GREATER than the unix code for the time
//that the user made the call to the api, and LESS than 86,400 seconds.  Store this in a variable.
//Do a for each arrow function for the results of the API

// userTime

// time={time1,
// time2,
// time3,
// time4,
// time5}

// const isNotInHourlyWindow = times => (time > userTime) && (time >= (userTime + 86400))
// const next24Hours = something