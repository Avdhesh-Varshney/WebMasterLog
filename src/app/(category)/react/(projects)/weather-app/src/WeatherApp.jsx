import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from 'react';

export default function WeatherApp(){

    const [weatherInfo, setWeatherInfo]= useState({

        city : "Delhi",
        feelsLike:24.45,
        temp :23.05,
        tempMin: 23.90,
        tempMax : 24.49,
        humidity: 45,
        weather: "fog",

    });

    let updateInfo=(newInfo) =>{
        setWeatherInfo(newInfo);
    }
    
    return(
    <div style={{textAlign:"center"}}>
    <h2>Weather App</h2>
    <SearchBox updateInfo={updateInfo}/>
    <InfoBox info={weatherInfo}/>
    </div>
    )
}