import React from 'react';
import { availableLocations } from '../utils/location-list';


export const SettingPage = (props) =>{
    const cities = availableLocations.map((location) => location.cityName);
    let cityName = props.cityName


    const handleClick = (e) =>{
        props.setIsOpened(false)
    }

    const handleChange = (e) =>{
        cityName= e.target.value;
    }

    const handleSubmit = () =>{
        const value = document.getElementById('locaotion_select').value
        const locationObj = availableLocations.find((location) =>{
            return location.cityName === value
        })

        console.log(`儲存的地區資訊為：${value}`);
        console.log(locationObj)
        alert(`儲存成功!，地區已改為${value}`);
        props.setIsOpened(false);
        props.setCityName(value);
        props.setLocationName(locationObj.locationName)
    }
    
    return (
        <div className="setting-page-container">
            <div className="setting-page">
                <div className="title">
                    設定
                </div>
                <div className="sub-title">選擇地區</div>
                <select id="locaotion_select" size="5" onChange={handleChange} value={cityName}>
                    {cities.map(location => (
                       <option value={location} key={location}>{location}</option>
                    ))}
                </select>
                <div className="btn-container">
                    <button className="back-btn" onClick={handleClick}>返回</button>
                    <button className="save-btn" onClick={handleSubmit}>儲存</button>
                </div>
            </div>
            <div className="body-wrap"></div>
        </div>
    )
}