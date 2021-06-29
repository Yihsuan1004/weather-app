import React, { useState } from 'react';
import { useWeatherApi } from './hooks/useWeatherApi'
import { Page } from './component/main-page'


function App() {
  const [cityName, setCityName] = useState('新北市')
  const [locationName, setLocationName] = useState('板橋')
  const [isOpened, setIsOpened] = useState(false);
  const cityNameEnCode = encodeURI(cityName);
  const [currentWeather,fetchData] = useWeatherApi(cityNameEnCode,locationName)


  return (
   <div className="app">
     <Page  currentWeather = {currentWeather} 
            locationName = {locationName}
            isOpened = {isOpened}
            cityName = {cityName}
            setCityName = {setCityName}
            setLocationName = {setLocationName}
            fetchData = {fetchData}
            setIsOpened = {setIsOpened}
          />
   </div>
  );
}

export default App;
