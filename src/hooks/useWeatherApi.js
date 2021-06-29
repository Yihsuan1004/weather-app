
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
/*--- background img ---*/
import cloudyBG from "../assets/img/bg/cloudy.jpg";
import rainyBG from "../assets/img/bg/rainy.jpg";
import sunnyBG from "../assets/img/bg/sunny.jpg";
import thunderBG from "../assets/img/bg/thunder.jpg";
import snowBG from "../assets/img/bg/snow.png";

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

const weatherBackground = {
    isSunny: sunnyBG,
    isCloudy: cloudyBG,
    isRainy: rainyBG,
    isFoggy: cloudyBG,
    isFoggyRain: rainyBG,
    isSnow: snowBG,
    isThunderstorm: thunderBG
}

const api = {
    key: "CWB-EB3A1C0D-09C5-4015-A7E2-6FF0342FD490",
    base: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
    futureWeather: 'F-C0032-001',
    currentWeather:'O-A0003-001',
    stationId: 466880
}

export const useWeatherApi = (cityName,locationName) =>{
    const[currentWeather , setCurrentWeather ] = useState({
        city:'',
        type:'',
        typeValue: 0,
        description: '',
        averageTemperature: 0,
        minTemperature: 0,
        maxTemperature: 0,
        probabilityOfPrecipitation: 0, /*降雨機率*/
        windSpeed: 0,
        humidity: 0,
      });

    const weatherBgSrc = (weatherValue) =>{
        const background = document.getElementById('main_page');
        const weatherType = Object.entries(weatherTypes).find
        ((type)=> {
              return type[1].includes(Number(weatherValue))
        }) || [];
        background.style.backgroundImage = `url(${weatherBackground[weatherType[0]]})`
    }
    
    const fetchCurrentWeather = (locationName) =>{
        return axios.get(`${api.base}${api.currentWeather}?Authorization=${api.key}&locationName=${locationName}&elementName=TEMP,HUMD,WDSD&parameterName=CITY`)
        .then((response) => {
          console.log(response,'currentWeather',locationName)
          const weatherData = response.data.records.location[0].weatherElement;
          const obsTime = response.data.records.location[0].time.obsTime
          var requiredData = {};
          weatherData.forEach(
            (item) =>  {
              requiredData[item.elementName] = item.elementValue;
              return requiredData
            }
          )
         return { 
            windSpeed: requiredData.WDSD,
            averageTemperature: Math.round(requiredData.TEMP),
            humidity: (requiredData.HUMD) * 100,
            obsTime: obsTime
          }
        })
        .catch(error => console.error(`Error ${error}`))
      }
    
    const fetchFutureWeather = (cityName) =>{
        return axios.get(`${api.base}${api.futureWeather}?Authorization=${api.key}&locationName=${cityName}`)
        .then((response) =>{
            console.log(response,'futureWeather',cityName)

            const weatherData = response.data.records.location[0].weatherElement;
            const locationName = response.data.records.location[0].locationName;
            var requiredData = {};
            weatherData.forEach(
                (item) =>  {
                requiredData[item.elementName] = item.time[0].parameter;
                return requiredData
                }
            )
            weatherBgSrc(requiredData.Wx.parameterValue);
            return{ 
                city: locationName,
                type: requiredData.Wx.parameterName,
                typeValue: requiredData.Wx.parameterValue,
                probabilityOfPrecipitation: requiredData.PoP.parameterName,
                minTemperature: requiredData.MinT.parameterName,
                description: requiredData.CI.parameterName,
                maxTemperature: requiredData.MaxT.parameterName
            }
        })
        .catch(error => console.error(`Error ${error}`))
    }
    
    const fetchData = useCallback(() => {
        const fetchingData = async() =>{
          try{
            const[currentWeather, futureWeather] = await axios.all([
              fetchCurrentWeather(locationName),
              fetchFutureWeather(cityName)]);
    
              setCurrentWeather( { 
                ...currentWeather,
                ...futureWeather,
              })
                 
          }
          catch(error){
            console.error(error)
          }
        }
        fetchingData()
      },[cityName,locationName])
      
      useEffect(() => {
        fetchData()
      } , [fetchData]);

      return [currentWeather,fetchData];


}