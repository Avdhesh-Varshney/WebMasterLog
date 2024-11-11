const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn')
const weather_img = document.querySelector('.weather-img')
const temperature = document.querySelector('.temperature')
const description = document.querySelector('.description')
const humidity = document.querySelector('#humidity')
const wind_speed = document.querySelector('#wind-speed')
const location_not_found = document.querySelector('.location-not-found')
const weather_body = document.querySelector('.weather-body')





searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value)
})

async function checkWeather(city){
    const api_key = '646824f2b7b86caffec1d0b16ea77f79';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    
    const weather_data = await fetch(url)
    .then(response => response.json())
    .catch((error) => {
        console.log(error)
    })


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
  
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15 )}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "./Images/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./Images/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./Images/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./Images/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./Images/snow.png";
            break;

    }


    console.log(weather_data)
    
}


