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

  let today = document.querySelector("h3");
  today.innerHTML = `${currentDay} ${hours}:${minutes}hrs`;
}
giveDay();

let apiKey = "b5041e1072f4742b00c1dd94e3c50ed7";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=${units}`;
let city = "citySearch.value";

function changeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = citySearch.value;
}
let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", changeCity);

function showWeather(response) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5041e1072f4742b00c1dd94e3c50ed7&units=${units}`;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let city = searchCity.value;
  console.log(city);
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
