import React from 'react';
import { dateBuilder,hourMinuteFormater } from '../utils/date-converter'
import umbrella from "../assets/img/icon/umbrella.png";
import wind from "../assets/img/icon/wind.png";
import waterdrop from "../assets/img/icon/waterdrop.png";
import { SettingPage } from './setting-page'
import { WeatherIcon } from './weather-icon.js';

export function Page (props){

    const weather = props.currentWeather;
    const obsTime = hourMinuteFormater(new Date(weather.obsTime));
    const humidity = Math.floor(weather.humidity)
    const handleClick = () => {
      props.setIsOpened(true)
      console.log(props.isOpened)
    }


    return(
    <main id="main_page"> 
      <div className="setting-container">
        <button onClick={handleClick}></button>
      </div>
      <div className="time-and-temperature-container">
        <div>
          <div className="city">{props.cityName}</div>
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
        <WeatherIcon weatherValue={weather.typeValue} weatherCity={props.cityName}/>
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
          <div className="weather-item-value">{humidity} <span>%</span></div>
        </div>
      </div>
      <div className="obs-time-container">
        <div className="obs-time" >
          <div>觀測時間:{obsTime}</div>
        </div>
      </div>
      {props.isOpened ? <SettingPage  setIsOpened={props.setIsOpened}  
                                      setLocationName={props.setLocationName}
                                      setCityName = {props.setCityName}
                                      /> : null }
     </main>
    )
}

