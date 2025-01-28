const apikey = "f22ffd233c7a1e55def3b96eb330828e";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(region = "Ranchi") {
    try {
        const response = await fetch(apiurl + region + `&appid=${apikey}`);

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }
        
        const data = await response.json();
        console.log(data);
        document.querySelector(".region").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "assets/cloud.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "assets/rain.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "assets/clear.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "assets/snow.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "assets/mist.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "assets/drizzle.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        alert("An error occurred while fetching weather data.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

checkWeather();

 // Cursor following functionality
 document.addEventListener('mousemove', (event) => {
    const circle = document.querySelector('.circle');
    circle.style.left = `${event.clientX}px`;
    circle.style.top = `${event.clientY}px`;
});
