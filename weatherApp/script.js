"use strict"

var sub_button = document.querySelector('button');

var search = document.querySelector('#city');
var loadingText = document.querySelector('#load');
var weatherBox = document.querySelector('#weather');
var loadingText = document.querySelector('#load');
var weatherBox = document.querySelector('#weather');

var weatherCity = weatherBox.firstElementChild;
var weatherDescription = document.querySelector('#weatherDescription');
var weatherTemperature = weatherBox.lastElementChild;
function Weather(cityName, description){
	this.cityName = cityName;
	this.description = description;
	this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
	get: function(){
		return this._temperature;
	},
	set: function(value){
		this._temperature = (value * 1.8 + 32).toFixed(2) + 'F';
	}
});

sub_button.addEventListener('click', showValue);

function showValue(){
	loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
   var cityName = search.value;
   if(cityName.trim().length == 0){
   	alert("please type the city name");
   }
   var apiKey = '906d8a99b45400a314627ead9645c56d';
   var http = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
   var method = 'GET';
   http.open(method, url);
   http.onreadystatechange = function (){
   	if(http.readyState == XMLHttpRequest.DONE && http.status === 200){
       		var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
   	}else if( http.readyState === XMLHttpRequest.DONE){
   		alert("Something went wrong");
   	}
   };
    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}
