function giveDay() {
  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = weekDays[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let today = document.querySelector("h2");
  today.innerHTML = `${currentDay} ${hours}:${minutes}hrs`;
}
giveDay();

let searchCity = document.querySelector("#city-input");
let city = "searchCity.value";
let apiKey = "b5041e1072f4742b00c1dd94e3c50ed7";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=${units}`;
let iconElement = document.querySelector("#icon");

function changeCity(event) {
event.preventDefault();
let cityElement = document.querySelector("#current-city");
cityElement.innerHTML = searchCity.value;
let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", changeCity);
}
function showWeather(response) {
document.querySelector("#current-city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#desc").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = response.data.wind.speed;
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
celsiusTemperature = response.data.main.temp;
iconElement.setAttribute("alt")= response.data.weather[0].description;
axios.get(apiUrl).then(showWeather);
}


function showCity(event) {
event.preventDefault();
let city = searchCity.value;
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=${units}`;

axios.get(apiUrl).then(showWeather);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", showCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
getCurrentPosition();

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add ("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}
function showCelsiusTemperature(event) {
   event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);  
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove ("active");
}


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature)

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature)