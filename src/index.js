"use strict";

let currentTemp = 0;
const defaultCity = 'Seattle';
let isFahrenheit = true; 

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
const toggleTempUnit = document.getElementById('toggleTempUnit');

const updateTempDisplay = () => {
    tempValue.style.visibility = 'visible';
    tempValue.textContent = `${currentTemp}°${isFahrenheit ? 'F' : 'C'}`;
    tempValue.className = '';

    if (currentTemp >= 80){
        tempValue.classList.add('red');
        landscape.textContent = "🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵";
    } else if (currentTemp >= 70){
        tempValue.classList.add('orange');
        landscape.textContent = "🌸🌿🌼🌸🌿🌼🌸🌿🌼🌸🌿";
    } else if (currentTemp >= 60){
        tempValue.classList.add('yellow');
        landscape.textContent = "🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾";
    } else if (currentTemp >= 50){
        tempValue.classList.add('green');
        landscape.textContent = "⛄️🌲🌲🌲🌲🍁🌲🌲🌲🌲⛄️";
    } else {
        tempValue.classList.add('teal');
        landscape.textContent = "⛄️🌲🌲🌲🌲🍁🌲🌲🌲🌲⛄️";
    }
};

const changeTemperature = (amount) => {
    currentTemp += amount;
    updateTempDisplay();
};

const updateSky = () => {
    const selectedSky = skySelect.value;
    if (selectedSky == 'sunny') {
        sky.textContent = '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️';
    } else if (selectedSky == 'cloudy') {
        sky.textContent = '☁️☁️🌤☁️☁️🌤☁️☁️🌤☁️☁️';
    } else if (selectedSky == 'rainy') {
        sky.textContent = '🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧';
    } else if (selectedSky == 'snowy') {
        sky.textContent = '❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️';
    }
};

const resetCity = () => {
    cityNameInput.value = defaultCity;
    headerCityName.textContent = defaultCity;
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
    let tempF = await getWeatherFromCoordinates(coordinates.latitude, coordinates.longitude);

    if (isFahrenheit) {
        currentTemp = tempF;
    } else {
        currentTemp = Math.round((tempF - 32) * 5 / 9);
    }
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

cityNameReset.addEventListener('click', resetCity);

toggleTempUnit.addEventListener('click', () => {
    if (isFahrenheit) {
        currentTemp = Math.round((currentTemp - 32) * 5 / 9);
        toggleTempUnit.textContent = 'Switch to °F';
        isFahrenheit = false;
    } else {
        currentTemp = Math.round((currentTemp * 9 / 5) + 32);
        toggleTempUnit.textContent = 'Switch to °C';
        isFahrenheit = true;
    }
    updateTempDisplay();
});

window.addEventListener('DOMContentLoaded', async () => {
    resetCity();
    updateSky();
    await getTemp();
    updateTempDisplay();
});