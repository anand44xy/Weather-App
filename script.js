const inputBox = document.querySelector('#inpBox');
const weatherBox = document.querySelector('#weather-box');

async function getWeather() {
  weatherBox.innerHTML = "<h1 class='text-center loader'>Loading ...</h1>"; //for loading
  const cityName = inputBox.value;

  if (cityName !== '') {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bcaf274f80e006b137357ee311910734`);
      const data = await response.json();

      if (data.cod == 404) {
        alert('Please enter a correct city name.');
        inputBox.value = ''; // Clear the input box
        weatherBox.innerHTML = ''; // Clear the weather box
      } else {
        const tempCelsius = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius

        weatherBox.innerHTML = `
          <div class="d-flex bg-light justify-content-center w-full gap-4 align-items-center bg-transparent p-3">
            <div>
              <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            </div>
            <div>
              <h1>${tempCelsius}&deg;C</h1>
              <h1>${data.weather[0].description}</h1>
               <h1>${data.name}, ${data.sys.country}</h1>
              
            </div>
          </div>`;
      }
    } catch (error) {
      weatherBox.innerHTML = "<h1 class='text-center'>Error fetching weather data</h1>";
    }
  } else {
    alert('Please enter a city name.');
    weatherBox.innerHTML = ''; // Clear the weather box if the input is empty
  }
}

inputBox.addEventListener("keyup", function (e) {
  if (e.key === 'Enter') {
    getWeather();
  }
});

document.querySelector('button').addEventListener('click', getWeather);


