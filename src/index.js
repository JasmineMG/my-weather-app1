function giveDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = document.querySelector("h1");
  today.innerHTML = `${currentDay} ${hours}:${minutes}`;
}
giveDay();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=${units}`;

  axios.get(url).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function titleCase(input) {
  input = input.toLowerCase().split(" ");
  for (let index = 0; index < input.length; index++) {
    input[index] = input[index].charAt(0).toUpperCase() + input[index].slice(1);
  }
  return input.join(" ");
}
function getForecast(coordinates) {
  let apiKey = `b5041e1072f4742b00c1dd94e3c50ed7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = titleCase(
    response.data.name
  );
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML = titleCase(
    response.data.weather[0].description
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector(`#feels-like`).innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemperature = response.data.main.temp;
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  searchCity.innerHTML = `${searchCity.value}`;
  let city = searchCity.value.trim().toLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="59"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° | </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°  </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let searchCity = document.querySelector("#city-input");
let city = "searchCity.value";

let cityElement = document.querySelector("#current-city");
cityElement.innerHTML = searchCity.value;

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", showCity);

function changeCity(event) {
  event.preventDefault();
  let apiKey = "b5041e1072f4742b00c1dd94e3c50ed7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let searchEngine = document.querySelector("#search-form");
  searchEngine.addEventListener("submit", showCity);
  axios.get(apiUrl).then(displayForecast);
}
