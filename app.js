console.log("javaconnected");    

const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const temperature = document.querySelector(".temperature h1");
const details = document.querySelectorAll(".detail h3");

const weatherCondition = document.querySelector(".temperature p");
const cityName = document.querySelector(".temperature span");

const humidity = details[0];
const windSpeed = details[1];




searchBtn.addEventListener("click", () =>{
     const city = searchInput.value


const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

fetch(geoUrl)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)

    const location = data.results[0];

    const latitude = location.latitude;
    const longitude = location.longitude;

    console.log(latitude);
    console.log(longitude);
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    fetch(weatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((weatherData) => {
        console.log(weatherData);

        
    
        const currenttemp = weatherData.current.temperature_2m;
        const currentHumidity = weatherData.current.relative_humidity_2m;
        const currentWind = weatherData.current.wind_speed_10m;
        
    
        temperature.textContent = `${currenttemp}°C`;
        humidity.textContent = `${currentHumidity}%`;
        windSpeed.textContent = `${currentWind} km/h`;
        cityName.textContent = `📍 ${city}`;
    }); 
    })
});

