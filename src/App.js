import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import cloudyBG from "./assets/img/bg/cloudy.jpg";
import rainyBG from "./assets/img/bg/rainy.jpg";
import sunnyBG from "./assets/img/bg/sunny.jpg";
import thunderBG from "./assets/img/bg/thunder.jpg";
import snowBG from "./assets/img/bg/snow.png";
import { Page } from './component/main-page'

const api = {
  key: "CWB-EB3A1C0D-09C5-4015-A7E2-6FF0342FD490",
  base: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
  futureWeather: 'F-C0032-001',
  currentWeather:'O-A0003-001',
  city: encodeURI('澎湖縣'),
  cities: "466940,C0AC70,466880,467050,C0D390,C0D570,C0E420,C0F0B0,C0G640,C0H890,C0K240,C0M690,C0M730,C0O950,C0V500,C0R100,467060,466990,C0S690,C0W110,C0W130,C0W140"
  /* 466940:基隆市,C0AC70:台北市,466880:新北市,467050:桃園市,467571:新竹縣,C0D570:新竹市,
  C0E420:苗栗縣,C0F0B0:台中市,C0G640:彰化縣,C0H890:南投縣,C0K240:雲林縣,
  C0M690:嘉義縣,C0M730:嘉義市,C0O950:台南市,C0V500:高雄市,C0R100:屏東縣,
  467060:宜蘭縣,466990:花蓮縣,C0S690:台東縣,
  C0W110:連江縣, C0W130:澎湖縣, C0W140:金門縣*/
}

function App() {

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
    humidity: 0
  });

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

  const weatherBgSrc = (weatherValue) =>{
    console.log(weatherValue,'val');
    const background = document.getElementById('saveee');
    const weatherType = Object.entries(weatherTypes).find
    ((type)=> {
          return type[1].includes(Number(weatherValue))
    }) || [];
    console.log(weatherBackground[weatherType[0]])
    background.style.backgroundImage = `url(${weatherBackground[weatherType[0]]})`
  }

  const fetchCurrentWeather = () =>{
    return axios.get(`${api.base}${api.currentWeather}?Authorization=${api.key}&elementName=TEMP,HUMD,WDSD&parameterName=CITY&stationId=466880`)
    .then((response) => {
      const weatherData = response.data.records.location[0].weatherElement;
      console.log(weatherData);
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
        humidity: (requiredData.HUMD) * 100
      }
    })
    .catch(error => console.error(`Error ${error}`))
  }

  const fetchFutureWeather = () =>{
    return axios.get(`${api.base}${api.futureWeather}?Authorization=${api.key}&locationName=${api.city}`)
    .then((response) =>{
      const weatherData = response.data.records.location[0].weatherElement;
      const locationName = response.data.records.location[0].locationName;
      console.log(response)
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
      const[currentWeather, futureWeather] = await axios.all([
        fetchCurrentWeather(),
        fetchFutureWeather()]);
        setCurrentWeather( { 
          ...currentWeather,
          ...futureWeather,
        })        
    }
    fetchingData()
  },[])
  
  useEffect(() => {
    fetchData()
  } , [fetchData]);


  return (
   <div className="app">
     <Page currentWeather = {currentWeather}/>
   </div>
  );
}

export default App;
