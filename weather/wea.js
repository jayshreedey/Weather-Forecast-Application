
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather = {};

weather.temperature = {
	unit : "celsius"

}
const KELVIN = 273;

const key = "49ad76e9ae8f624ffb0025072f76d7b0";

if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);

}
else{
	notificationElement.style.display = "block";
	notificationElement.innerHTML = "<p> Browser does not support!</p>";
	}

	function setPosition(position)
	{
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;

		getWeather(latitude, longitude);
	}

	function showError(error){
		notificationElement.style.display = "block";
		notificationElement.innerHTML = `<p> ${error.message} </p>`;
	
	} 
	function getWeather(latitude, longitude)
	{
		let api = `http://api.openweathermap.org/data/2.5/weather?
		lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then(function(response){
    	let data = response.json();
    	return data;
    })
    .then(function(data){
    	weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    	weather.description = data.weather[0].description;
    	weather.iconId = data.name;
    	weather.country = data.sys.country;
    })
    .then(function()
    {
    	displayWeather();
    	});
    }

function displayWeather(){
	iconElement.innerHTML = `<img src= weather.jpg />`;
	tempElement.innerHTML = `${weather.temperature.value} <span>C</span`;
	descElement.innerHTML =  weather.description;
	locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

