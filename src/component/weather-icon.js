import React from 'react';
import sunnyMorning from "../assets/img/icon/sunny-morning.png";
import sunnyNight from "../assets/img/icon/sunny-night.png";
import cloudyMorning from "../assets/img/icon/cloudy-morning.png";
import cloudyNight from "../assets/img/icon/cloudy-night.png";
import foggyMorning from "../assets/img/icon/foggy-morning.png";
import foggyNight from "../assets/img/icon/foggy-night.png";
import foggyRainMorning from "../assets/img/icon/foggy-rain-morning.png";
import foggyRainNight from "../assets/img/icon/foggy-rain-night.png";
import rainMorning from "../assets/img/icon/rainy-morning.png";
import rainNight from "../assets/img/icon/rainy-night.png";
import snowMorning from "../assets/img/icon/snow-morning.png";
import snowNight from "../assets/img/icon/snow-night.png";
import thunderMorning from "../assets/img/icon/thunder-morning.png";
import thunderNight from "../assets/img/icon/thunder-night.png";
import loadingImg from "../assets/img/Spinner-0.9s-217px.svg"


export const WeatherIcon = (props) =>{
    const weatherTypeValue = props.weatherValue;
    console.log('weatherTypes',typeof(props.weatherValue));
    const weatherTypes = {
        isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
        isSunny: [1],
        isFoggyRain: [31,32,38, 39],
        isCloudy: [2, 3, 4, 5, 6, 7],
        isFoggy: [24,25, 26, 27, 28],
        isRainy: [
            8, 9, 10, 11, 12,13,
            14, 19, 20, 29, 30, 
        ],
        isSnow: [23, 37, 42],
    };
    const weatherIcons = {
        morning :{
            isSunny: sunnyMorning,
            isCloudy: cloudyMorning,
            isRainy: rainMorning,
            isFoggy: foggyMorning,
            isFoggyRain: foggyRainMorning,
            isSnow: snowMorning,
            isThunderstorm: thunderMorning
        },
        night: {
            isSunny: sunnyNight,
            isCloudy: cloudyNight,
            isRainy: rainNight,
            isFoggy: foggyNight,
            isFoggyRain: foggyRainNight,
            isSnow: snowNight,
            isThunderstorm: thunderNight
        }
    }

    const weatherIconSrc = (weatherValue,) =>{
        const weatherType = Object.entries(weatherTypes).find
        ((type)=> {
              return type[1].includes(Number(weatherValue))
        }) || [];
        return weatherIcons.morning[weatherType[0]] || loadingImg;
    }

    

    return (
        <div className="weather-icon">
           <img src={weatherIconSrc(weatherTypeValue)} alt="weather"/>
        </div>
    )

}