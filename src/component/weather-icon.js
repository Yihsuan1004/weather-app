import React from 'react';
import { dateFormater } from '../utils/date-converter';

// @see https://opendata.cwb.gov.tw/dataset/astronomy/A-B0062-001 
import sunriseAndSunsetData from '../assets/json/sunrise-sunset.json';

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
    const weatherCity = props.weatherCity;
    let weatherType = null;
    let morningOrNight = null;  
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

    
    const getlocationData  = async(locationName) =>{
        try {
            const locationData = sunriseAndSunsetData.find(obj => obj.locationName === locationName);
            const date = dateFormater(new Date());
            const localTime = new Date().getTime();
            const sunRiseAndsunSet = locationData.time.find(data => data.Date === date);
            const sunRiseTime = new Date(`${sunRiseAndsunSet.Date} ${sunRiseAndsunSet.SunRiseTime}`).getTime();
            const sunSetTime = new Date(`${sunRiseAndsunSet.Date} ${sunRiseAndsunSet.SunSetTime}`).getTime();
            return localTime > sunRiseTime && localTime < sunSetTime ? 'morning' : 'night'
        }
        catch (error){
            console.warn(error)
        }
        
    }

    const findWeatherType = async() =>{
        try {
            return Object.entries(weatherTypes).find
            ((type)=> {
                return type[1].includes(Number(weatherTypeValue))
            }) || [];
        }
        catch(error){
            console.warn(error)
        }
    }

    const returnIcon = () =>{
        Promise.all(
            [findWeatherType(weatherTypeValue),
            getlocationData(weatherCity)])
            .then((result) =>{
                weatherType = result[0][0];
                morningOrNight = result[1];
         }).then(() =>{
             if(weatherType && morningOrNight){
                const iconSrc =  weatherIcons[morningOrNight][weatherType]
                document.getElementById('icon').src = iconSrc
             }
            
         })
    }

 
    return (
        <div className="weather-icon">
           <img id="icon"src={returnIcon() || loadingImg} alt="weather"/>
        </div>
    )

}