import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import Map from './components/Map.js'


class App extends React.Component{

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    sunrise:undefined,
    sunset:undefined,
    error: undefined
  }
  getWeather = async (e) =>{
    //preventing the default behaviour of the component ie refreshing
    e.preventDefault();
   const city = e.target.elements.city.value;
   const country = e.target.elements.country.value;

    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&appid=face1cdc56989c92e56d2fd71612f7ba');

    
    const data = await api_call.json();
    //check to see if these values exist, if they do then run the code
     if (city && country){
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,

      error:""
    });
  } 
//if there is no values entered, keep all the fields set to undefined and dispaly error message
  else{
      this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      sunrise:undefined,
      sunset:undefined,
      error:"Please enter a City and Country"
    });
}
}

  render(){
    return(
    <div >
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
              <div className="container">
              <Titles/>
              <Map/>
              </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
         </div>
      </div>
      </div>
    );
  }
};
export default App;



    