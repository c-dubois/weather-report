"use strict";

let currentTemp = 0;
const defaultCity = 'Seattle';

const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const tempValue = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const currentTempButton = document.getElementById('currentTempButton');
const skySelect = document.getElementById('skySelect');
const sky = document.getElementById('sky');
const cityNameReset = document.getElementById('cityNameReset');

window.addEventListener('DOMContentLoaded', async () => {
    resetCity();
    await getTemp();
    updateTempDisplay();
    updateSky();
});

const updateTempDisplay = () => {
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

const changeTemperature = (amount) => {
    currentTemp += amount;
    updateTempDisplay();
};

function getCoordinates(cityName) {
    return axios.get('http://127.0.0.1:5000/location',
        {
            params: {
                q: cityName
            }
        })
        .then( (response) => {
            const latitude = response.data[0].lat;
            const longitude = response.data[0].lon;
            return {latitude, longitude};
        })
        .catch( (error) => {
            console.log(error);
        });
    };
    
function getWeatherFromCoordinates(latitude, longitude) {
    return axios.get('http://127.0.0.1:5000/weather',
        {
            params: {
                lat: latitude,
                lon: longitude
            }
        })
        .then( (response) => {
            const temperature = response.data.main.temp;
            return Math.round((temperature - 273.15) * 9/5 + 32);
        })
        .catch( (error) => {
            console.log(error);
        });
};

const getTemp = async () => {
    const coordinates = await getCoordinates(cityNameInput.value);
    currentTemp = await getWeatherFromCoordinates(coordinates.latitude, coordinates.longitude);
};

const updateSky = () => {
    const selectedSky = skySelect.value;
    if (selectedSky == 'sunny') {
        sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (selectedSky == 'cloudy') {
        sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (selectedSky == 'rainy') {
        sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (selectedSky == 'snowy') {
        sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
};

const resetCity = () => {
    cityNameInput.value = defaultCity;
    headerCityName.textContent = defaultCity;
};

increaseTempControl.addEventListener('click', () => changeTemperature(1));
decreaseTempControl.addEventListener('click', () => changeTemperature(-1));

cityNameInput.addEventListener('input', () => {
    headerCityName.textContent = cityNameInput.value;
});

currentTempButton.addEventListener('click', async () => {
    await getTemp();
    updateTempDisplay();
});

skySelect.addEventListener('change', updateSky);

cityNameReset.addEventListener('click', () => {
    cityNameInput.value = defaultCity;
    headerCityName.textContent = defaultCity;

})