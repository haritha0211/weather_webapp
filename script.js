// Weather API configuration
const weatherApi = {
    key: '9d9eff5685543ced811a94f49566c3e7',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};

// Anonymous function to run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    let searchInputBox = document.getElementById('input-box');
    
    // Adding event listener for key press of enter
    searchInputBox.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            getWeatherReport(searchInputBox.value);
        }
    });
});

// Function to get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        })
        .then(showWeatherReport);
}

// Function to display weather report
function showWeatherReport(weather) {
    let city_code = weather.cod;
    if (city_code === 400) {
        swal("Empty Input", "Please enter a valid city", "error");
        reset();
    } else if (city_code === 404) {
        swal("Invalid Input", "Entered city didn't match!", "warning");
        reset();
    } else {
        let op = document.getElementById('weather-body');
        op.style.display = 'block';
        let todayDate = new Date();
        let parent = document.getElementById('parent');
        let weather_body = document.getElementById('weather-body');
        weather_body.innerHTML =
            `
        <div class="location-details">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date"> ${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
            <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
            <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
            <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
        </div>
        `;
        parent.innerHTML = weather_body.innerHTML;

        changeBg(weather.weather[0].main);
        reset();
    }
}

// Function to get the current time
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

// Function to manage the current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

// Function to change background dynamically according to weather status
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(img/clouds.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(img/rainy.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(img/clear.jpg)';
    } else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(img/snow.jpg)';
    } else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(img/sunny.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(img/drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(img/mist.jpg)';
    } else {
        document.body.style.backgroundImage = 'url(img/bg.jpg)';
    }
}

// Function to get the icon class based on weather status
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm') {
        return 'fas fa-bolt';
    } else if (classarg === 'Drizzle') {
        return 'fas fa-cloud-rain';
    } else {
        return 'fas fa-cloud-sun';
    }
}

// Function to reset the input field
function reset() {
    let input = document.getElementById('input-box');
    console.log(input); // This should log the input element
    if (input) {
        input.value = "";
    } else {
        console.error("Input element not found.");
    }
}


// Function to add zero if hour and minute are less than 10
function addZero(i) {
    return (i < 10) ? "0" + i : i;
}
