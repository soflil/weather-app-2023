let now = new Date();
let dayTime = document.querySelector("#day-time");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

dayTime.innerHTML = `${day}, ${hours}:${minutes}`;

//

function showMyCurrentData(response) {
  let homeTemperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let windspeed = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let feelsLike = Math.round(response.data.main.feels_like);
  let skyDescription = response.data.weather[0].description;

  let temperature = document.querySelector("#temperature-heading");
  temperature.innerHTML = `${homeTemperature}°C`;

  let city = document.querySelector("#city-name");
  city.innerHTML = `${cityName}`;

  let windData = document.querySelector("#wind-speed");
  windData.innerHTML = `Windspeed: ${windspeed}km/h`;

  let humidityData = document.querySelector("#humidity");
  humidityData.innerHTML = `Humidity: ${humidity}%`;

  let feelsLikeData = document.querySelector("#feels-like");
  feelsLikeData.innerHTML = `Feels like: ${feelsLike}°C`;

  let skyData = document.querySelector("#sky-description");
  skyData.innerHTML = `${capitaliseSkyDescription(skyDescription)}`;
}

function capitaliseSkyDescription(skyDecription) {
  let words = skyDecription.split(" ");
  let result = "";

  words.forEach((word) => {
    let uppercasedWord = word.charAt(0).toUpperCase() + word.slice(1);
    result = result + " " + uppercasedWord;
  });
  return result.trim();
}

function searchCity(event) {
  event.preventDefault();

  let searchCityInput = document.querySelector("#enter-city-slot");

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchCityInput.value}`;
  showCityName(searchCityInput.value);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", searchCity);

function showCityName(cityName) {
  let units = "metric";
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showMyCurrentData);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showMyCurrentData);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
