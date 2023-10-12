let searchBtn = document.querySelector('#search-form');
let textInput = document.querySelector('#textInput');
let history = document.querySelector('#history');
let historyList = document.querySelector('#historyList');
let currentCity = document.querySelector('.current-city');
let currentDate = document.querySelector('.current-date');
let weatherIcon = document.querySelector('#icon');
let currentTemperature = document.querySelector('.current-temperature');
let currentWind = document.querySelector('.current-wind');
let currentHumidity = document.querySelector('.current-humidity');
let fiveDay = document.querySelector('.five-day-forecast');
let counrtyCode = document.querySelector('#country');

const apiKey = 'f8291849ba2ba581c967f471c596323b';


let userInput = function (event) {
    event.preventDefault();
    const inputValue = textInput.value
    const country = counrtyCode.value
    getCurrentWeather(inputValue, country)
    getForecast(inputValue, country)
}

let getCurrentWeather = function (city, country) {
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=metric&appid=" + apiKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            let cDate = new Date();
            let iconCode = data.weather[0].icon;

            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            weatherIcon.setAttribute('src', iconUrl);
            currentCity.textContent = data.name;
            currentDate.textContent = cDate.toLocaleDateString();
            currentTemperature.textContent = "Temp: " + data.main.temp;
            currentWind.textContent = "Wind: " + data.wind.speed;
            currentHumidity.textContent = "Humidity: " + data.main.humidity;
        })
}

let getForecast = function (city, country) {
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&units=metric&appid=" + apiKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (let i = 0; i < 5; i++) {
                const cardDiv = document.createElement('div');
                const innerDiv = document.createElement('div');

                const cityEl = document.createElement('h4');
                cityEl.textContent = data.city.name;

                // let date = new Date() + 1;

                // const dateEl = document.createElement('h5');
                // // dateEl.textContent = data.list[8].dt.toLocaleDateString();
                // dateEl.textContent = date.toLocaleDateString();

                let iconCode = data.list[8].weather[0].icon;
                let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                const imgEl = document.createElement('img');
                imgEl.setAttribute('src', iconUrl);

                const tempEl = document.createElement('p');
                tempEl.textContent = data.list[8].main.temp;

                const windEl = document.createElement('p');
                windEl.textContent = data.list[8].wind.speed;

                const humidityEl = document.createElement('p');
                humidityEl.textContent = data.list[8].main.humidity;

                // const h1 = document.createElement('h1')    
                // h1.textContent = "hello"
                // fiveDay.append(h1)



                let divEl = cardDiv.append(innerDiv);
                divEl.append(h4);
            }


            // let cDate = new Date()
            // let iconcode = data.weather[0].icon

            // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // weatherIcon.setAttribute('src', iconurl)
            // currentCity.textContent = data.name;
            // currentDate.textContent = cDate.toLocaleDateString()

            // currentTemperature.textContent = "Temp: " + data.main.temp;
            // currentWind.textContent = "Wind: " + data.wind.speed;
            // currentHumidity.textContent = "Humidity: " + data.main.humidity;
        })
}

searchBtn.addEventListener('submit', userInput)













// // Function to get weather data from OpenWeatherMap API
// const getWeatherData = async (url) => {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//     }
// };

// // Function to update the weather information on the page
// const updateWeatherInfo = async (location) => {
//     const weatherInfoElement = $('#weather-info');
//     weatherInfoElement[0].classList.remove('hide');
//     const weatherData = await getWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=metric`);
//     if (weatherData) {
//         const temperature = weatherData.main.temp;
//         const description = weatherData.weather[0].description;

//         const weatherInfo = `Temperature: ${temperature}°C, ${description}`;
//         weatherInfoElement[0].textContent = weatherInfo;
//     }
// };