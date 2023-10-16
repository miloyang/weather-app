// Defining the variables in order to select each classes and ids
let searchBtn = document.querySelector('#search-form');
let textInput = document.querySelector('#textInput');
let historyEl = document.querySelector('.history');
let historyList = document.querySelector('.historyList');
let currentCity = document.querySelector('.current-city');
let currentDate = document.querySelector('.current-date');
let weatherIcon = document.querySelector('#icon');
let currentTemperature = document.querySelector('.current-temperature');
let currentWind = document.querySelector('.current-wind');
let currentHumidity = document.querySelector('.current-humidity');
let fiveDay = document.querySelector('.five-day-forecast');

const apiKey = 'f8291849ba2ba581c967f471c596323b';

let city = function (cityName) {
    const inputValue = cityName || textInput.value;

    // Clearing the previous search results
    fiveDay.innerHTML = '';

    getCurrentWeather(inputValue);
    getForecast(inputValue);
};

// Fetching the current weather
let getCurrentWeather = function (city) {
    let queryURL =
        'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let cDate = new Date();
            let iconCode = data.weather[0].icon;

            var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
            weatherIcon.setAttribute('src', iconUrl);
            currentCity.textContent = data.name;
            currentDate.textContent = cDate.toLocaleDateString();
            currentTemperature.textContent = 'Temp: ' + data.main.temp + " 'C";
            currentWind.textContent = 'Wind Speed: ' + data.wind.speed + " m/s";
            currentHumidity.textContent = 'Humidity: ' + data.main.humidity + " %";
        });
};

// Fetching the 5 days forecast
let getForecast = function (city) {
    let queryURL =
        'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=' + apiKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < data.list.length; i++) {
                // To filter through the 40 results to only get the 5 days result
                if ((i + 1) % 8 === 0) {

                    // Creating the div and all elements needed to display the 5 days forecast
                    const cardDiv = document.createElement('div');
                    const innerDiv = document.createElement('div');

                    const dateEl = document.createElement('h4');
                    dateEl.textContent = data.list[i].dt_txt;

                    let iconCode = data.list[i].weather[0].icon;
                    let iconUrl =
                        'http://openweathermap.org/img/w/' + iconCode + '.png';
                    const imgEl = document.createElement('img');
                    imgEl.setAttribute('src', iconUrl);

                    const tempEl = document.createElement('p');
                    tempEl.textContent = "Temp: " + data.list[i].main.temp + " 'C";

                    const windEl = document.createElement('p');
                    windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + " m/s";

                    const humidityEl = document.createElement('p');
                    humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + " %";

                    // Appending all the elements to the parent div
                    innerDiv.append(dateEl, imgEl, tempEl, windEl, humidityEl);
                    let divEl = cardDiv.appendChild(innerDiv);
                    fiveDay.append(divEl);
                }
            }
        });
};

// Adding an event listener to call the city function when a search is submitted
searchBtn.addEventListener('submit', function (event) {
    event.preventDefault();
    city();
});

let previousSearch = JSON.parse(localStorage.getItem('previousSearch')) || [];

searchBtn.addEventListener('submit', function (event) {
    event.preventDefault();

    historyEl.classList.add('hide');

    if (textInput.value === '' || previousSearch.indexOf(textInput.value) !== -1) {
        return;
    }

    previousSearch.unshift(textInput.value);

    localStorage.setItem('previousSearch', JSON.stringify(previousSearch));

    showHistory();

    // Only showing the last 5 search history
    if (previousSearch.length > 4) {
        previousSearch.pop();
    }

    // Clearing the text input box after every search
    textInput.value = '';
});

textInput.addEventListener('click', function () {
    historyEl.classList.remove('hide');
});

function showHistory() {

    // Creating html elements inside historyList
    historyList.innerHTML = '';

    for (let i = 0; i < previousSearch.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('historyItem');

        let aEl = document.createElement('button');
        aEl.textContent = previousSearch[i];
        aEl.href = '#';

        aEl.addEventListener('click', function (event) {
            event.preventDefault();
            city(previousSearch[i]);
        });

        newDiv.appendChild(aEl);
        historyList.appendChild(newDiv);
    }
}

showHistory();