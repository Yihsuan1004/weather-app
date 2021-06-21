import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Page } from './component/page'


const api = {
  key: "CWB-EB3A1C0D-09C5-4015-A7E2-6FF0342FD490",
  base: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
  futureWeather: 'F-C0032-001',
  currentWeather:'O-A0003-001',
  city: encodeURI('新北市')
}

function App() {
  const[currentWeather , serCurrentWeather ] = useState({
    city:'新北市',
    type:'晴天',
    description: '舒適至悶熱',
    averageTemperature: '28',
    minTemperature: '24',
    maxTemperature:'32',
    probabilityOfPrecipitation: '30', /*降雨機率*/
    windSpeed: '30',
    humidity: '20'
  });

  useEffect(() => {
    fetchCurrentWeather();
    fetchFutureWeather();
  },[])

  const fetchCurrentWeather = () =>{
    axios.get(`${api.base}${api.currentWeather}?Authorization=${api.key}&elementName=TEMP,HUMD,WDSD&parameterName=CITY`)
    .then(response => console.log('currentWeather',response))
    .catch(error => console.error(`Error ${error}`))
  }

  const fetchFutureWeather = () =>{
    axios.get(`${api.base}${api.futureWeather}?Authorization=${api.key}&locationName=${api.city}`)
    .then((response) =>{
      const weatherData = response.data.records.location[0].weatherElement;
      var requiredData = {};
      weatherData.forEach(
        (item) =>  {
          requiredData[item.elementName] = item.time[0].parameter.parameterName;
          return requiredData
        }
      )
      serCurrentWeather((prev) => ({ ...prev, 
        type: requiredData.Wx,
        probabilityOfPrecipitation: requiredData.PoP,
        minTemperature: requiredData.MinT,
        description: requiredData.CI,
        maxTemperature: requiredData.MaxT
      }))
    })
    .catch(error => console.error(`Error ${error}`))
  }

  
  const handleClick = () =>{
      axios.get(`${api.base}?Authorization=${api.key}&locationName=${api.city}`)
      .then((response) =>{
        const weatherValue = response.data.records.location[0].weatherElement;
        console.log(weatherValue);
        serCurrentWeather((prev) => ({ ...prev, 
          type: weatherValue[0].time[1].parameter.parameterName,
          probabilityOfPrecipitation: weatherValue[1].time[1].parameter.parameterName,
          minTemperature: weatherValue[2].time[1].parameter.parameterName,
          description: weatherValue[3].time[1].parameter.parameterName,
          maxTemperature: weatherValue[4].time[1].parameter.parameterName
        }))
      })
      .catch(error => console.error(`Error ${error}`))
  }
  return (
   <div className="app">
     <button onClick={handleClick}></button>
     <Page 
      currentWeather = {currentWeather}
      
     />
   </div>
  );
}

export default App;
