function refreshWeather(response){

let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
 temperatureElement.innerHTML= Math.round(temperature);


let cityElement= document.querySelector("#city");
cityElement.innerHTML= response.data.city;

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML= response.data.condition.description;

let humidityElement= document.querySelector("#humidity")
humidityElement.innerHTML=`${response.data.temperature.humidity} %`;

let windSpeedElement=document.querySelector("#wind-speed");
windSpeedElement.innerHTML=`${response.data.wind.speed} km/h`;

let iconElement= document.querySelector("#icon");
iconElement.innerHTML= `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;

let dayTimeElement= document.querySelector("#day-time");
let date = new Date(response.data.time * 1000);
dayTimeElement.innerHTML = formatDate(date);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

 let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
 return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
    let apiKey="3ff7d683098935a0968o4346t1bfd699";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

function displayForecast(){

let days =["Mon", "Tue", "Wed","Thu","Fri"]

let forecastHtml= "";
days.forEach (function(day ) {
    forecastHtml= forecastHtml+
 `<div class="weather-forecast">
          <div class="weather-forecast-day">
            <div class="weather-forecast-date"> <strong> ${day}</strong> </div>
            <div class="weather-forecast-icon">  <img src ="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" width= "75" > </div>
            <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperature-max">
                <strong>20°C  </strong>
              </div>
              <div class="weather-forecast-temperature-min">16°C  </div>
            </div>
            </div>
          </div>`;});
let forecastElement = document.querySelector("#forecast")
forecastElement.innerHTML= forecastHtml
}
searchCity("pretoria")
displayForecast();