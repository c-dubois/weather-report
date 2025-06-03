"use strict";

let currentTemp = 0;

const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const tempValue = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const currentTempButton = document.getElementById('currentTempButton');

const updateTemp = () => {
    tempValue.textContent = `${currentTemp}°F`;

    tempValue.className = '';

    if (currentTemp >= 80){
        tempValue.classList.add('red');
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (currentTemp >= 70){
        tempValue.classList.add('orange');
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (currentTemp >= 60){
        tempValue.classList.add('yellow');
        landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (currentTemp >= 50){
        tempValue.classList.add('green');
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        tempValue.classList.add('teal');
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};
    
increaseTempControl.addEventListener('click', () => {
    currentTemp++;
    updateTemp();
});

decreaseTempControl.addEventListener('click', () => {
    currentTemp--;
    updateTemp();
});

cityNameInput.addEventListener('input', () => {
    headerCityName.textContent = cityNameInput.value;
});

async function getCoordinates(cityName) {
    let latitude, longitude;
    return axios.get('http://127.0.0.1:5000/location',
        {
            params: {
                q: cityName
            }
        })
        .then( (response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            console.log('success in getCoordinates!', latitude, longitude);
            return {latitude, longitude};
        })
        .catch( (error) => {
            console.log('error in getCoordinates!');
            console.log(error);
        });
};

async function getWeatherFromCoordinates(latitude, longitude) {
    let temperature;
    return axios.get('http://127.0.0.1:5000/weather',
        {
            params: {
                lat: latitude,
                lon: longitude
            }
        })
        .then( (response) => {
            temperature = response.data.main.temp;
            console.log('success in getWeatherFromCoordinates!', temperature);
            return Math.round((temperature - 273.15) * 9/5 + 32);
        })
        .catch( (error) => {
            console.log('error in getWeatherFromCoordinates!');
            console.log(error);
        });
};

currentTempButton.addEventListener('click', async () => {
    const coordinates = await getCoordinates(cityNameInput.value);
    const temperature = await getWeatherFromCoordinates(coordinates.latitude, coordinates.longitude);
    currentTemp = temperature;
    updateTemp();
});