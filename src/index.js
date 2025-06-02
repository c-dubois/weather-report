"use strict";

let currentTemp = 0;
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const tempValue = document.getElementById('tempValue')

const updateTemp = () => {
    tempValue.textContent = `${currentTemp}°C`
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