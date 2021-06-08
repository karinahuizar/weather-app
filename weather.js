// Feature #2
function searchCity(city) {
  let apiKey = "4f894c5c0cfd49cc623438c61c83e0ef";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let searchResult = cityInput.value;
  let searchAnswer = document.querySelector("#now-city");
  searchAnswer.innerHTML = searchResult;
  searchCity(searchResult);
}

// Feature #1
let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let dia = document.querySelector("#currentDate");
let hora = document.querySelector("#currentTime");
dia.innerHTML = `${day}, ${hour}:${minute}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
          <br />
          <i class="fas fa-sun"></i>
          <br />
          <br />
          <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">25°</span>|
          <span class="weather-forecast-temperature-min">10°</span>
          
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperature = Math.round(fahrenheitTemperature);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  h1.innerHTML = city;
  document.querySelector(".number").innerHTML = temperature;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4f894c5c0cfd49cc623438c61c83e0ef";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(currentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  // remove the active class from the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
searchCity("Oklahoma City");

displayForecast();
