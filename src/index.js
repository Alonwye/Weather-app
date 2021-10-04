let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  function getCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#searchCity");
    let searchedCity = document.querySelector("h1.searchedCity");
    searchedCity.innerHTML = searchCity.value;
    let url = `${geoApi}`;
    let units = "";
    units = `&units=${currentUnit}`;
    let appId = `&appid=${weatherKey}`;
    url = url + "q=" + searchCity.value + appId + units;
    axios.get(url).then(passCityWeather);
    //return searchedCity;
  }
  
  let currentUnit = "metric";
  let weatherKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?`;
  
  function displayCityWeather(temp, idToUpdate) {
    let temperature = Math.round(temp);
    let temperatureHeading = document.querySelector(idToUpdate);
    console.log(temperature);
    if (currentUnit === "metric") {
      temperatureHeading.innerHTML = `${temperature}°C`;
    } else {
      temperatureHeading.innerHTML = `${temperature}°F`;
    }
  }
  
  function passCityWeather(weather) {
    displayCityWeather(weather.data.main.temp, "h3");
  }
  
  function displayWeather(temp, idToUpdate) {
    let temperature = Math.round(temp);
    let temperatureHeading = document.querySelector(idToUpdate);
    console.log(temperature);
    if (currentUnit === "metric") {
      temperatureHeading.innerHTML = `${temperature}°C`;
    } else {
      temperatureHeading.innerHTML = `${temperature}°F`;
    }
  }
  
  function passGeoWeather(weather) {
    displayWeather(weather.data.main.temp, "h3");
  }
  
  function getGeoWeather(extraData) {
    let url = `${geoApi}`;
    let units = "";
    units = `&units=${currentUnit}`;
    let appId = `&appid=${weatherKey}`;
    url = url + appId + units + "&" + extraData;
    axios.get(url).then(passGeoWeather);
  }
  
  function showCurrentPosition(position) {
    console.log(
      `Latitude = ${position.coords.latitude}\nLongitude = ${position.coords.longitude}`
    );
    let weatherData = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    getGeoWeather(weatherData);
  }
  function getPosition() {
    navigator.geolocation.getCurrentPosition(showCurrentPosition);
  }
  
  let citySearch = document.querySelector("#search");
  citySearch.addEventListener("click", getCity);
  
  function dateFormat(todayDate) {
    let day = days[todayDate.getDay()];
    let hourNow = todayDate.getHours();
    let minutesNow =
      (todayDate.getMinutes() < 10 ? "0" : "") + todayDate.getMinutes();
    let today = `${day} ${hourNow}:${minutesNow}`;
    return today;
  }
  
  //var currentTime = document.querySelector("h2.currentTime");
  //currentTime.innerHTML = dateFormat(new Date());
  
  let tempLow = document.querySelectorAll("span.temp-low");
  console.log(tempLow);
  
  function createFahrenheit(event) {
    event.preventDefault();
    let temperatureNow = document.querySelector("span.currentTemp");
    let temperature = temperatureNow.innerHTML;
    temperature = Number(temperature);
    temperatureNow.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
  
  let currentLocationButton = document.querySelector("#currentLocation");
  currentLocationButton.addEventListener("click", getPosition);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", createFahrenheit);
  
  function createCelcius(event) {
    event.preventDefault();
    let temperatureNow = document.querySelector("span.currentTemp");
    temperatureNow.innerHTML = 19;
  }
  
  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", createCelcius);
  