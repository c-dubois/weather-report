"use strict";

let currentTemp = 0;

const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const tempValue = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');

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

updateTemp();

cityNameInput.addEventListener('input', () => {
    headerCityName.textContent = cityNameInput.value;
});