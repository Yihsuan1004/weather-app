import React from 'react';
import umbrella from "../assets/img/icon/umbrella.png";
import wind from "../assets/img/icon/wind.png";
import waterdrop from "../assets/img/icon/waterdrop.png";
import cloudyBG from "../assets/img/bg/cloudy.jpg";
import rainyBG from "../assets/img/bg/rainy.jpg";
import sunnyBG from "../assets/img/bg/sunny.jpg";
import thunderBG from "../assets/img/bg/thunder.jpg";
import snowBG from "../assets/img/bg/snow.png";
import { SettingButton } from './setting-button';
import { SettingPage } from './setting-page';
import { WeatherIcon } from './weather-icon.js';

export function Page (props){

    const dateBuilder = (d) =>{
        let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let day = days[d.getDay()];
        let month = d.getMonth()+1;
        let date = d.getDate();
        let year = d.getFullYear();
        return `${year}/${month}/${date} ${day}`
    }
    const weather = props.currentWeather;
  
    return(
    <main id="saveee"> 
      <div className="setting-container">
        <SettingButton />
      </div>
      <div className="time-and-temperature-container">
        <div>
          <div className="city">{weather.city}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div>
        <div><span className="unit"></span><div className="average-temperature"> {weather.averageTemperature}</div></div>
        <div className="min-max-temperature">
            <div className="temperature">最高: {weather.maxTemperature > weather.averageTemperature ?  weather.maxTemperature :  weather.averageTemperature}</div>
            <div className="temperature">最低: {weather.minTemperature < weather.averageTemperature ?  weather.minTemperature :  weather.averageTemperature}</div>
        </div>
        </div>
      </div>
      <div className="primary-info-container">
        <WeatherIcon weatherValue={weather.typeValue}/>
        <div className="weather-type">
            {weather.type}
        </div>
        <div className="weather-description">
        {weather.description}
        </div>
      </div>
      <div className="secondary-info-container">
        <div className="weather-item">
          <div className="weather-item-icon">
            <img src = {umbrella} alt="降雨機率"/>
          </div>
          <div className="weather-item-value">{weather.probabilityOfPrecipitation} <span>%</span></div>
        </div>
        <div className="weather-item">
        <div className="weather-item-icon">
          <img src = {wind} alt="風速"/>
        </div>
          <div className="weather-item-value">{weather.windSpeed} <span>m/s</span></div>
        </div>
        <div className="weather-item">
          <div className="weather-item-icon">
            <img src = {waterdrop} alt="濕度"/>
          </div>
          <div className="weather-item-value">{weather.humidity} <span>%</span></div>
        </div>
      </div>
      {/* <SettingPage /> */}
     </main>
    )
}

