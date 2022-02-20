import React, { useEffect, useState } from 'react';

import './LandingPage.css';
import './../Icons/main-css/weather-icons.min.css';


const LandingPage = () => {
    const [searchValue,setSearchValue] = useState('rangpur');
    const [mydata,setMydata] = useState([]);
    const {name,temp,humidity,pressure,wind,country,mood,sunrise,sunset} = mydata;
    
    var moodIcon = 'wi-day-sunny';
    switch(mood){
        case 'Clear' : moodIcon = 'wi-day-sunny';
        break;
        case 'Clouds' : moodIcon = 'wi-night-alt-cloudy';
        break;
        case 'Haze' : moodIcon = 'wi-day-haze';
        break;
        case 'Mist' : moodIcon = 'wi-night-snow-wind';
        break;
        case 'Rain' : moodIcon = 'wi-day-rain';
        break;
        default: moodIcon='wi-day-sunny';
    }

    useEffect(()=>{
        formSubmitted()
        setSearchValue('')
    },[]);

    const formSubmitted = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=dba5385cfab8a83aea8036ab7efce578`)
            .then(response => response.json())
            .then(data => {
               if(data !==''){
                   console.log(data);
                   const name = data.name;
                   const {temp,humidity,pressure} = data.main;
                   const wind = data.wind.speed;
                   const {country,sunrise,sunset} = data.sys;
                   const mood = data.weather[0].main;
                   const sunRiseTime = new Date(sunrise).toLocaleTimeString();
                   const sunSetTime = new Date(sunset).toLocaleTimeString();
                   const gotDatas = {
                            'name':name,
                            'temp':temp,
                            'humidity':humidity,
                            'pressure':pressure,
                            'wind':wind,
                            'country':country,
                            'mood':mood,
                            'sunrise':sunRiseTime,
                            'sunset':sunSetTime
                   }
                   setMydata(gotDatas);
                   setSearchValue('')
               }else{
                   console.log('data not found')
               }
            });
            
            
    }
    // setInterval()={
    //     localDate()
    // },1000)
    const [localTime,setLocaltime] = useState();
    const localDate =() =>  {
        const newTime = new Date().toLocaleTimeString()
        setLocaltime(newTime)
    };
    setInterval(localDate,100);
    return (
        <div className='card'>
            <div className="main-area">
                <div className="left">
                    <div className="top">
                        <h5 className='dayName'>Tuesday</h5>
                        <h5>{localTime}</h5>
                        <h5 className='countryName'>{name},{country}</h5>
                    </div>
                    <div className="icon">
                        <i className={`wi ${moodIcon} weather-icon`}></i>
                    </div>
                    <div className="bottom">
                        <h1 className='degree'>{temp}&deg;C</h1>
                        <h5 className='mood'>{mood}</h5>
                    </div>

                </div>
                <div className="right">
                    <div className="top">
                        <div>
                            <p className='leftpara'>Pressure</p>
                            <p>{pressure}</p>
                        </div>
                        <div>
                            <p className='leftpara'>Humidiy</p>
                            <p>{humidity}%</p>
                        </div>
                        <div>
                            <p className='leftpara'>wind</p>
                            <p>{wind} kmph</p>
                        </div>
                        <div>
                            <p className='leftpara'>Sunrise</p>
                            <p>{sunrise}</p>
                        </div>
                        <div>
                            <p className='leftpara'>Sunset</p>
                            <p>{sunset}</p>
                        </div>
                    </div>
                    <div className="middle">
                        <h2>{mydata.name + ','} {country}</h2>
                    </div>
                    <div className="bottom">
                        <form action='' onSubmit={() => formSubmitted()}>
                            <input type="text" placeholder='Search City' value={searchValue} className='searchBox' onChange={(e)=>setSearchValue(e.target.value)}/>
                            {/* <button type='submit' className='searchBtn'>Search</button> */}
                            <input type='submit' className='searchBtn' value='Search'></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;