
const apiKey = 'f8291849ba2ba581c967f471c596323b';
let city = 'Sydney'; 
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

fetch(queryURL);












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